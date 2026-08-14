<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('category', [
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
            ]);
            $table->text('description');
            $table->unsignedBigInteger('price');
            $table->string('image_path')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
