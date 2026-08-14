<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->enum('service_type', [
                'Rental Mobil',
                'Charter Drop',
                'City Tour',
                'Open Trip',
                'Tour Paket',
                'Custom/Door-to-Door'
            ])->default('Tour Paket')->after('category');

            $table->string('destination')->nullable()->after('service_type');
            $table->text('includes')->nullable()->comment('JSON array of included facilities')->after('destination');
            $table->text('excludes')->nullable()->comment('JSON array of excluded items')->after('includes');
            $table->unsignedTinyInteger('duration_days')->default(1)->after('excludes');
            $table->unsignedTinyInteger('min_pax')->default(1)->after('duration_days');
            $table->unsignedTinyInteger('max_pax')->default(6)->after('min_pax');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn(['service_type', 'destination', 'includes', 'excludes', 'duration_days', 'min_pax', 'max_pax']);
        });
    }
};
