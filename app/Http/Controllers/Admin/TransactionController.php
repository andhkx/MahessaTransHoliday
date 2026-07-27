<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::with('package')
            ->when($request->search, fn($q) => $q->where('customer_name', 'like', '%' . $request->search . '%')
                ->orWhere('invoice_number', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return view('admin.transactions.index', compact('transactions'));
    }

    public function create()
    {
        $packages = Package::where('is_active', true)->get();
        return view('admin.transactions.form', ['transaction' => new Transaction(), 'packages' => $packages]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'package_id'    => ['required', 'exists:packages,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone'=> ['required', 'string', 'max:30'],
            'booking_date'  => ['required', 'date'],
            'final_price'   => ['required', 'integer', 'min:0'],
            'status'        => ['required', 'in:DP,Lunas'],
        ]);

        Transaction::create($data);

        return redirect()->route('admin.transactions.index')->with('success', 'Transaksi berhasil ditambahkan.');
    }

    public function edit(Transaction $transaction)
    {
        $packages = Package::where('is_active', true)->get();
        return view('admin.transactions.form', compact('transaction', 'packages'));
    }

    public function update(Request $request, Transaction $transaction)
    {
        $data = $request->validate([
            'package_id'    => ['required', 'exists:packages,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone'=> ['required', 'string', 'max:30'],
            'booking_date'  => ['required', 'date'],
            'final_price'   => ['required', 'integer', 'min:0'],
            'status'        => ['required', 'in:DP,Lunas'],
        ]);

        $transaction->update($data);

        return redirect()->route('admin.transactions.index')->with('success', 'Transaksi berhasil diperbarui.');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->route('admin.transactions.index')->with('success', 'Transaksi berhasil dihapus.');
    }
}
