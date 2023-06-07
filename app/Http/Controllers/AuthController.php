<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use ReallySimpleJWT\Token;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
		$request->validate([
			'nickname' => 'required|min:3|max:16',
			'password' => 'required|min:9',
		],
		[
			'nickname.required' => 'Никнейм обязателен для заполнения',
			'nickname.min' => 'Никнейм должен иметь минимум 3 символа',
			'nickname.max' => 'Никнейм должен иметь максимум 16 символов',
			'password.required' => 'Пароль обязателен для заполнения',
			'password.min' => 'Пароль должен иметь минимум 9 символов'
		]);
		
		$nickname = $request->nickname;
		$password = $request->password;

		$find_user = User::where("nickname", $nickname)->first();

		if (!$find_user) {
			return response(["success" => false, "message" => "Пользователя с таким никнеймом не существует"], 404)
				->header("Content-Type", "application/json");
		}

		$password_is_correct = Hash::check($password, $find_user->password);

		if (!$password_is_correct) {
			return response(["success" => false, "message" => "Неверный пароль" ], 422)
				->header("Content-Type", "application/json");
		}

		$user_id = $find_user->id;
		$jwt_key = env("SECRET");
		$expiration = time() * 3600;
		$issuer = env("HOST");

		$token = Token::create($user_id, $jwt_key, $expiration, $issuer);

		return response(["success" => true, "token" => $token], 200)
			->header("Content-Type", "application/json");
	}

	public function registration(Request $request) {
		$request->validate([
			'nickname' => 'required|min:3|max:16',
			'password' => 'required|min:9',
			'email' => 'required|email',
			'avatar' => 'max:1024|mimes:png,jpg,jpeg,svg'
		],
		[
			'nickname.required' => 'Никнейм обязателен для заполнения',
			'nickname.min' => 'Никнейм должен иметь минимум 3 символа',
			'nickname.max' => 'Никнейм должен иметь максимум 16 символов',
			'password.required' => 'Пароль обязателен для заполнения',
			'password.min' => 'Пароль должен иметь минимум 9 символов',
			'email.required' => 'Электронная почта обязательна для заполнения',
			'email.email' => 'Электронная почта должна быть в формате электронной почты',
			'avatar.max' => 'Файл аватара не может весить больше 1мб',
			'avatar.mimes' => 'Файл аватара может иметь следующее расширение: png, jpg, jpeg, svg'
		]);

		$avatar = $request->file("avatar");
		$nickname = $request->input("nickname");
		$email = $request->input("email");
		$password = $request->input("password");
		$fileExt = $request->fileExt;

		$find_user = User::where("email", $email)->orWhere("nickname", $nickname)->first();

		if ($find_user) {
			return response(["success" => false, "message" => "Такой пользователь уже существует"], 409)
				->header("Content-Type", "application/json");
		}

		$hash_password = Hash::make($password);

		$new_user = User::create([
			"nickname" => $nickname,
			"email" => $email,
			"password" => $hash_password
		]);

		if ($request->hasFile("avatar") && $avatar->isValid()) {
			$file_name = $nickname.'-'.date('Y-m-d-H-i-s').".".$fileExt;
			$avatar->storeAs("avatars", $file_name);

			$new_user->avatar = $file_name;
			$new_user->save();
		}

		return response(["success" => true, "message" => "Пользователь создан"], 200)
			->header("Content-Type", "application/json");
	}
}
