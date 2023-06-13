<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{
    public function add(Request $request) {
        if (!$request->is_authenticated) {
            return response(['success' => false, 'message' => 'Для выполнения следующей операции необходимо авторизоваться'], 401)
                ->header('Content-Type', 'application/json');
        }

        $request->validate([
			'poster' => 'required|max:5120|mimes:png,jpg,jpeg,svg',
			'name' => 'required|min:3|max:26',
		],
		[
			'poster.required' => 'Постер обязателен для загрузки',
			'poster.max' => 'Постер должен весить не более 5 мб',
			'poster.mimes' => 'Постер может иметь следующие расширения: png, jpg, jpeg, svg',
            'name.required' => 'Название обязательно для заполнения',
            'name.min' => 'Название должно иметь минимум 3 символа',
            'name.max' => 'Название может иметь максимум 26 символов',
		]);

        $playlist_data = [
            'ownerId' => $request->user_id,
            'name' => $request->input('name'),
            'poster' => '',
            'audio' => $request->addedAudio
        ];
        $current_user = $request->user;
        $poster = [
            'ext' => $request->file('poster')->getClientOriginalExtension(),
            'file' => $request->file('poster'),
        ];

        if (Playlist::where(['name' => $playlist_data['name'], 'ownerId' => $request->user_id])->first()) {
            return response(['message' => 'Плейлист с таким названием у вас уже существует', 'success' => false], 409)
                ->header('Content-Type', 'application/json');
        }

        if ($request->hasFile('poster') && $poster['file']->isValid()) {
            $file_name = $playlist_data['ownerId'].'-'.date('Y-m-d-H-i-s').".".$poster['ext'];

			$poster['file']->storeAs("public/posters", $file_name);

			$playlist_data['poster'] = $file_name;
        }

        $playlist = Playlist::create($playlist_data);
        $userPlaylists = json_decode($current_user->playlists, true);

        array_push($userPlaylists, $playlist->id);

        $current_user->playlists = json_encode($userPlaylists);
        $current_user->save();

        return response(['success' => true, 'message' => 'Плейлист создан', 'playlists' => $current_user->playlists], 201)
            ->header('Content-Type', 'application/json');
    }

    public function getOne(Request $request, string $id) {
        $find_playlist = Playlist::find($id) ?? [];

        return response(['success' => true, 'playlist' => $find_playlist])
            ->header('Content-Type', 'application/json');
    }
}
