<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Audio;

class AudioController extends Controller
{
    public function getOne($id) {
        $find_audio = Audio::find($id);

        if (!$find_audio) {
            return response(['message' => 'Аудио не найдено', 'success' => false], 404)
                ->header('Content-Type', 'application/json');
        }

        return response(['audio' => $find_audio, 'success' => true], 200)
            ->header('Content-Type', 'application/json');
    }

    public function getAll() {
        $audio = Audio::all();
        
        return response(['audio' => $audio, 'success' => true], 200)
            ->header('Content-Type', 'application/json');
    }
}
