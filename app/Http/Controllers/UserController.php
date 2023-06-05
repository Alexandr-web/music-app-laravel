<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request) {
		$nickname = $request->input("nickname");
		$password = $request->input("password");

		$find_user = User::where("nickname", $nickname)->first();

		if (!$find_user) {
			return response()->json([
				"success" => false,
				"message" => "Пользователя с таким именем не существует"
			]);
		}

		// check password
		$current_password = Hash::check($password, $find_user->password);

		if (!$current_password) {
			return response()->json([
				"success" => false,
				"message" => "Данные неверны"
			]);
		}

		response()->json([
			"success" => true,
			"userId" => $find_user->id
		]);

		return redirect("/");
	}
}
