<?php

use App\Models\Tevekenyseg;
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
        Schema::create('tevekenysegs', function (Blueprint $table) {
            $table->id('tevekenyseg_id');
            $table->string('tevekenyseg_nev');
            $table->integer('pontszam');
            $table->timestamps();
        });

        Tevekenyseg::create([
            'tevekenyseg_id' => "1",
            'tevekenyseg_nev' => 'kerékpárral jöttem iskolába',
            'pontszam' => 10,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "2",
            'tevekenyseg_nev' => 'rollerrel jöttem iskolába ',
            'pontszam' => 20,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "3",
            'tevekenyseg_nev' => '10 km-t gyalogoltam buszozás helyett',
            'pontszam' => 30,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "4",
            'tevekenyseg_nev' => 'ültettem fát',
            'pontszam' => 40,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "5",
            'tevekenyseg_nev' => 'ültettem fát',
            'pontszam' => 50,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "6",
            'tevekenyseg_nev' => 'ültettem virágot',
            'pontszam' => 60,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "7",
            'tevekenyseg_nev' => 'ültettem egyéb növényt',
            'pontszam' => 70,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "8",
            'tevekenyseg_nev' => 'kevesebb vizet használtam a fürdéshez',
            'pontszam' => 80,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "9",
            'tevekenyseg_nev' => 'összeszedtem a szemetet egy közterületen, erdőben, stb',
            'pontszam' => 90,
        ]);

        Tevekenyseg::create([
            'tevekenyseg_id' => "10",
            'tevekenyseg_nev' => 'tartós szatyorba vásároltam, nem nylonba',
            'pontszam' => 100,
        ]);
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tevekenysegs');
    }
};
