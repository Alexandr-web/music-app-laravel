<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Playlist;
use App\Models\Audio;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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
		
		$page_data = [
			'current_user' => $current_user,
			'user' => $find_user,
			'is_guest' => $is_guest,
			'active_tab' => $active_tab
		];
		
		$default_view = view('user', $page_data);

		switch ($active_tab) {
			case "favorites":
				return $default_view;
			case "playlists":
				$array_playlists_id = json_decode($find_user['playlists'], true);
				$array_playlists_data = array_map(function ($playlist_id) {
					return Playlist::find($playlist_id);
				}, $array_playlists_id);

				return view('user', array_merge(['playlists' => $array_playlists_data], $page_data));
			case "settings":
				return $default_view;
		}

		$array_audios_id = json_decode($find_user['audio'], true);
		$array_audios_data = array_map(function ($audio_id) {
			return Audio::find($audio_id);
		}, $array_audios_id);

		return view('user', array_merge(['audio' => $array_audios_data], $page_data));
	}

	public function update(Request $request, string $id) {
		if (!$request->is_authenticated) {
            return response(['success' => false, 'message' => 'Для выполнения следующей операции необходимо авторизоваться'], 401)
                ->header('Content-Type', 'application/json');
        }

		$request->validate([
			'nickname' => 'required|min:3|max:16',
			'password' => 'nullable|min:9',
			'email' => 'required|email',
			'avatar' => 'max:1024|mimes:png,jpg,jpeg,svg'
		],
		[
			'nickname.required' => 'Никнейм обязателен для заполнения',
			'nickname.min' => 'Никнейм должен иметь минимум 3 символа',
			'nickname.max' => 'Никнейм должен иметь максимум 16 символов',
			'password.min' => 'Пароль должен иметь минимум 9 символов',
			'email.required' => 'Электронная почта обязательна для заполнения',
			'email.email' => 'Электронная почта должна быть в формате электронной почты',
			'avatar.max' => 'Файл аватара не может весить больше 1мб',
			'avatar.mimes' => 'Файл аватара может иметь следующие расширения: png, jpg, jpeg, svg'
		]);

		$new_gender = $request->gender;
		$new_email = $request->email;
		$new_nickname = $request->nickname;
		$new_password = $request->password;
		$new_avatar = $request->file("avatar");

		$current_user = $request->user;
		$old_nickname = $current_user->nickname;
		$old_email = $current_user->email;
		$old_gender = $current_user->gender;

		$new_data = [];

		if ($new_email !== $old_email) {
			$find_user_by_new_email = User::where("email", $new_email)->first();

			if ($find_user_by_new_email !== null) {
				return response([
					"success" => false,
					"message" => "Пользователь с такой почтой уже существует"
				], 409)->header("Content-Type", "application/json");
			}

			$new_data["email"] = $new_email;
		}

		if ($new_nickname !== $old_nickname) {
			$find_user_by_new_nickname = User::where("nickname", $new_nickname)->first();

			if ($find_user_by_new_nickname !== null) {
				return response([
					"success" => false,
					"message" => "Пользователь с таким никнеймом уже существует"
				], 409)->header("Content-Type", "application/json");
			}

			$new_data["nickname"] = $new_nickname;
		}

		if ($new_gender !== $old_gender) {
			$new_data["gender"] = $new_gender;
		}

		if ($new_password) {
			$hash_new_password = Hash::make($new_password);
			$new_data["password"] = $hash_new_password;
		}

		if ($request->hasFile("avatar") && $new_avatar->isValid()) {
			$old_avatar = $current_user->avatar;
			$ext = $new_avatar->getClientOriginalExtension();
			$file_name = $current_user->id . '-' . date('Y-m-d-H-i-s') . "." . $ext;

			if ($old_avatar !== "default.png") {
				Storage::delete("public/avatars/" . $old_avatar);

				$new_avatar->storeAs("public/avatars", $file_name);
				$new_data["avatar"] = $file_name;
			}
		}

		if (!count($new_data)) {
			return response([
				"success" => false,
				"message" => "Введите новые данные"
			], 400)->header("Content-Type", "application/json");	
		}

		$current_user->fill($new_data);
		$current_user->save();

		return response([
			"success" => true,
			"message" => "Данные обновлены",
			"user" => $current_user
		], 200)->header("Content-Type", "application/json");
	}
}
