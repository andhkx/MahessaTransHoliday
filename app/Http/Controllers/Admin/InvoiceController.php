<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function download(Transaction $transaction)
    {
        $transaction->load('package');

        $pdf = Pdf::loadView('admin.invoice', compact('transaction'))
            ->setPaper('a5', 'portrait');

        $filename = 'Invoice-' . $transaction->invoice_number . '.pdf';

        return $pdf->download($filename);
    }
}
