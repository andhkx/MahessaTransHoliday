<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Package extends Model
{
    protected $fillable = [
        'title', 
        'slug', 
        'category', 
        'description', 
        'price', 
        'image_path', 
        'is_active', 
        'meta_title', 
        'meta_description'
    ];

    protected static function booted()
    {
        static::saving(function ($package) {
            // Otomatis buat slug dari title jika kosong
            if (empty($package->slug)) {
                $package->slug = Str::slug($package->title);
            }
            
            // Otomatis buat fallback meta title untuk Google
            if (empty($package->meta_title)) {
                $package->meta_title = $package->title . ' Murah & Terbaik - Mahessa Trans';
            }
            
            // Otomatis buat deskripsi SEO singkat dari konten utama
            if (empty($package->meta_description)) {
                $package->meta_description = Str::limit(strip_tags($package->description), 150);
            }
        });
    }

    /**
     * FIX HARGA: Mengembalikan properti $package->formatted_price ke frontend
     */
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    /**
     * FIX FOTO: Mengembalikan properti $package->image_url ke frontend
     */
    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset('storage/' . $this->image_path);
        }
        return null;
    }
}
