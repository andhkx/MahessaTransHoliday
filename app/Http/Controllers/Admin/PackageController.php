<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PackageController extends Controller
{
    public function index(Request $request)
    {
        $packages = Package::when($request->search, fn($q) => $q->where('title', 'like', '%'.$request->search.'%'))
            ->latest()->paginate(10)->withQueryString();
        return view('admin.packages.index', compact('packages'));
    }

    public function create()
    {
        return view('admin.packages.form', ['package' => new Package(), 'categories' => $this->categories()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => ['required','string','max:255'],
            'category'    => ['required','in:'.implode(',', $this->categories())],
            'description' => ['required','string'],
            'price'       => ['required','integer','min:0'],
            'image'       => ['nullable','image','mimes:jpg,jpeg,png,webp','max:5120'],
            'is_active'   => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('packages', 'public');
        }

        unset($data['image']);
        $data['is_active'] = $request->boolean('is_active', true);
        Package::create($data);

        return redirect()->route('admin.packages.index')->with('success', 'Paket berhasil ditambahkan.');
    }

    public function edit(Package $package)
    {
        return view('admin.packages.form', ['package' => $package, 'categories' => $this->categories()]);
    }

    public function update(Request $request, Package $package)
    {
        $data = $request->validate([
            'title'       => ['required','string','max:255'],
            'category'    => ['required','in:'.implode(',', $this->categories())],
            'description' => ['required','string'],
            'price'       => ['required','integer','min:0'],
            'image'       => ['nullable','image','mimes:jpg,jpeg,png,webp','max:5120'],
            'is_active'   => ['boolean'],
        ]);

        if ($request->hasFile('image')) {
            if ($package->image_path) Storage::disk('public')->delete($package->image_path);
            $data['image_path'] = $request->file('image')->store('packages', 'public');
        }

        unset($data['image']);
        $data['is_active'] = $request->boolean('is_active');
        $package->update($data);

        return redirect()->route('admin.packages.index')->with('success', 'Paket berhasil diperbarui.');
    }

    public function destroy(Package $package)
    {
        if ($package->image_path) Storage::disk('public')->delete($package->image_path);
        $package->delete();
        return redirect()->route('admin.packages.index')->with('success', 'Paket berhasil dihapus.');
    }

    private function categories(): array
    {
        return [
            'Rental Mobil',
            'Charter Drop',
            'City Tour',
            'Open Trip',
            'Tour Lembang',
            'Tour Ciwidey',
            'Tour Bandung',
            'Tour Pangandaran',
            'Tour Jogja',
            'Tour Bromo',
            'Tour Bali',
            'Drop-off / Pick-up Bandara',
        ];
    }
}
