<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use ReallySimpleJWT\Token;

class UserController extends Controller
{
    public function login(Request $request) {
		/**
		 * TODO:
		 * Сделать валидацию
		 */
		
		$nickname = $request->input("nickname");
		$password = $request->input("password");

		$find_user = User::where("nickname", $nickname)->first();

		if (!$find_user) {
			return response()->json([
				"success" => false,
				"message" => "Пользователя с таким именем не существует"
			]);
		}

		$current_password = Hash::check($password, $find_user->password);

		if (!$current_password) {
			return response()
				->json([
					"success" => false,
					"message" => "Данные неверны"
				])
				->header("Content-Type", "application/json");
		}

		$user_id = $find_user->id;
		$jwt_key = env("SECRET");
		$expiration = time() * 3600;
		$issuer = "localhost";

		$token = Token::create($user_id, $jwt_key, $expiration, $issuer);

		return response()
			->json([
				"success" => true,
				"token" => $token
			])
			->header("Content-Type", "application/json");
	}

	public function registration(Request $request) {
		/**
		 * TODO:
		 * Принимать и сохранять файл;
		 * Сделать валидацию
		 */

		$avatar = $request->file("avatar");
		$nickname = $request->input("nickname");
		$email = $request->input("email");
		$password = $request->input("password");

		$find_user = User::where("email", $email)->first();

		if ($find_user) {
			return response()
				->json([
					"success" => false,
					"message" => "Пользователь с такой почтой уже существует"
				])
				->header("Content-Type", "application/json");
		}

		$hash_password = Hash::make($password);

		User::create([
			"nickname" => $nickname,
			"email" => $email,
			"password" => $hash_password
		]);

		return response()
			->json([
				"success" => true,
				"message" => "Пользователь создан"
			])
			->header("Content-Type", "application/json");
	}
}
