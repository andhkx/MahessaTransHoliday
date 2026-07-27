<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            'name'       => 'Admin Mahessa Trans',
            'email'      => 'admin@mahessatrans.com',
            'password'   => Hash::make('mahessa2024'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
