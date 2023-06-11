<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Audio;
use App\Helpers\AuthToken;

class UserController extends Controller
{
	public function getOne(Request $request) {
		$find_user = User::find($request->id);

		if (!$find_user) {
			return response(['success' => false, 'message' => 'Такого пользователя не существует'], 404)
				->header('Content-Type', 'application/json');
		}

		return response(['success' => true, 'user' => $find_user], 200)
			->header('Content-Type', 'application/json');
	}

	public function profileRender(Request $request, string $id) {
		$find_user = User::findOrFail($id);
		$current_user = $request->user;

		$is_guest = $current_user['id'] !== (int) $id;
		$active_tab = htmlspecialchars($_GET['tab'] ?? 'audio');
		$default_view = view('user', ['current_user' => $current_user, 'user' => $find_user, 'is_guest' => $is_guest, 'active_tab' => $active_tab]);

		switch ($active_tab) {
			case "favorites":
				return $default_view;
				break;
			case "playlists":
				return $default_view;
				break;
			case "settings":
				return $default_view;
				break;
		}

		$array_audios_id = json_decode($find_user['audio'], true);
		$array_audios_data = array_map(function ($audio_id) {
			return Audio::find($audio_id);
		}, $array_audios_id);

		return view('user', ['audio' => $array_audios_data, 'current_user' => $current_user, 'user' => $find_user, 'is_guest' => $is_guest, 'active_tab' => $active_tab]);
	}
}
