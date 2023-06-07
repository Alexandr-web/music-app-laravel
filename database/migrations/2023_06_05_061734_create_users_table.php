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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nickname')->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('avatar')->default("https://avatars.dzeninfra.ru/get-zen_doc/1893760/pub_5cc9b8537dea6f00b30d92d8_5cc9bb61cecf8300b334590b/scale_1200");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
