<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin cố định
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
                'role' => 'admin'
            ]
        );

        // 5 sinh viên cố định
        $sinhviens = [
            ['name' => 'Nguyen Van A', 'email' => 'a@student.com'],
            ['name' => 'Le Thi B', 'email' => 'b@student.com'],
            ['name' => 'Tran Van C', 'email' => 'c@student.com'],
            ['name' => 'Pham Thi D', 'email' => 'd@student.com'],
            ['name' => 'Hoang Van E', 'email' => 'e@student.com'],
        ];

        foreach ($sinhviens as $sv) {
            User::updateOrCreate(
                ['email' => $sv['email']],
                [
                    'name' => $sv['name'],
                    'password' => Hash::make('12345678'),
                    'role' => 'sinhvien'
                ]
            );
        }
    }
}