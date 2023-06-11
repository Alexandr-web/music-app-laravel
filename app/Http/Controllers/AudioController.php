<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Audio;
use App\Models\User;

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

    public function getAll(Request $request) {
        $name = $_GET['name'] ?? '';
        $audio;

        if (strlen($name) >= 3 && $request->is_authenticated) {
            $audio = Audio::where('name', $name)
                ->where('ownerId', $request->user_id)
                ->get() ?? [];
        } else {
            $audio = Audio::all() ?? [];
        }
        
        return response(['audio' => $audio, 'success' => true], 200)
            ->header('Content-Type', 'application/json');
    }

    public function upload(Request $request) {
        if (!$request->is_authenticated) {
            return response(['success' => false, 'message' => 'Для выполнения следующей операции необходимо авторизоваться'], 401)
                ->header('Content-Type', 'application/json');
        }

        $request->validate([
			'poster' => 'required|max:5120|mimes:png,jpg,jpeg,svg',
			'audio' => 'required|max:15360|mimes:flac,mpeg,mp3',
			'name' => 'required|min:3|max:46',
			'singer' => 'required|min:1|max:16',
		],
		[
			'poster.required' => 'Постер обязателен для загрузки',
			'poster.max' => 'Постер должен весить не более 5 мб',
			'poster.mimes' => 'Постер может иметь следующие расширения: png, jpg, jpeg, svg',
            'audio.required' => 'Аудио обязательно для загрузки',
			'audio.max' => 'Аудио должно весить не более 15 мб',
			'audio.mimes' => 'Аудио может иметь следующие расширения: mp3, mpeg, flac',
            'name.required' => 'Название обязательно для заполнения',
            'name.min' => 'Название должно иметь минимум 3 символа',
            'name.max' => 'Название может иметь максимум 46 символов',
            'singer.required' => 'Исполнитель обязателен для заполнения',
            'singer.min' => 'Исполнитель должен иметь минимум 1 символ',
            'singer.max' => 'Исполнитель может иметь максимум 16 символов'
		]);

        $poster = [
            'file' => $request->file('poster'),
            'ext' => $request->extPoster,
        ];

        $audio = [
            'file' => $request->file('audio'),
            'ext' => $request->extAudio,
        ];

        $audio_data = [
            'ownerId' => $request->user_id,
            'path' => '',
            'poster' => '',
            'time' => $request->time,
            'singer' => $request->input('singer'),
            'name' => $request->input('name')
        ];

        if ($request->hasFile('poster') && $poster['file']->isValid()) {
			$file_name = $audio_data['ownerId'].'-'.date('Y-m-d-H-i-s').".".$poster['ext'];

			$poster['file']->storeAs("public/posters", $file_name);

			$audio_data['poster'] = $file_name;
		}

        if ($request->hasFile('audio') && $audio['file']->isValid()) {
			$file_name = $audio_data['ownerId'].'-'.date('Y-m-d-H-i-s').".".$audio['ext'];
            
			$audio['file']->storeAs("public/audio", $file_name);

			$audio_data['path'] = $file_name;
		}

        $created_audio = Audio::create($audio_data);
        $owner = User::find($request->user_id);

        $ownerAudio = json_decode($owner->audio, true);

        array_push($ownerAudio, $created_audio['id']);

        $owner->audio = json_encode($ownerAudio);
        $owner->save();

        return response(['success' => true, 'message' => 'Аудио загружено'], 200)
            ->header('Content-Type', 'application/json');
    }
}
