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
        return view('admin.packages.form', [
            'package' => new Package(),
            'serviceTypes' => $this->serviceTypes(),
            'destinations' => $this->destinations(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'            => ['required','string','max:255'],
            'category'         => ['required','in:'.implode(',', $this->categories())],
            'service_type'     => ['required','in:'.implode(',', $this->serviceTypes())],
            'destination'      => ['nullable','string','max:255'],
            'description'      => ['required','string'],
            'price'            => ['required','integer','min:0'],
            'includes'         => ['nullable','array'],
            'excludes'         => ['nullable','array'],
            'duration_days'    => ['nullable','integer','min:1','max:30'],
            'min_pax'          => ['nullable','integer','min:1'],
            'max_pax'          => ['nullable','integer','min:1'],
            'image'            => ['nullable','image','mimes:jpg,jpeg,png,webp','max:5120'],
            'is_active'        => ['boolean'],
            'meta_title'       => ['nullable','string','max:255'],
            'meta_description' => ['nullable','string'],
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
        return view('admin.packages.form', [
            'package' => $package,
            'serviceTypes' => $this->serviceTypes(),
            'destinations' => $this->destinations(),
        ]);
    }

    public function update(Request $request, Package $package)
    {
        $data = $request->validate([
            'title'            => ['required','string','max:255'],
            'category'         => ['required','in:'.implode(',', $this->categories())],
            'service_type'     => ['required','in:'.implode(',', $this->serviceTypes())],
            'destination'      => ['nullable','string','max:255'],
            'description'      => ['required','string'],
            'price'            => ['required','integer','min:0'],
            'includes'         => ['nullable','array'],
            'excludes'         => ['nullable','array'],
            'duration_days'    => ['nullable','integer','min:1','max:30'],
            'min_pax'          => ['nullable','integer','min:1'],
            'max_pax'          => ['nullable','integer','min:1'],
            'image'            => ['nullable','image','mimes:jpg,jpeg,png,webp','max:5120'],
            'is_active'        => ['boolean'],
            'meta_title'       => ['nullable','string','max:255'],
            'meta_description' => ['nullable','string'],
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

    private function serviceTypes(): array
    {
        return [
            'Rental Mobil',
            'Charter Drop',
            'City Tour',
            'Open Trip',
            'Tour Paket',
            'Custom/Door-to-Door',
        ];
    }

    private function destinations(): array
    {
        return [
            'Lembang',
            'Ciwidey',
            'Bandung',
            'Pangandaran',
            'Jogja',
            'Bromo',
            'Bali',
            'Jakarta',
            'Bogor',
            'Garut',
            'Purwakarta',
            'Cilegon',
            'Padalarang',
            'Cimahi',
            'Bandara Soetta',
            'Stasiun KCIC Padalarang',
            'Bandung - Bali',
            'Bandung - Jogja',
            'Bandung - Bromo',
            'Bandung - Pangandaran',
            'Cimahi - Pangandaran',
        ];
    }
}
