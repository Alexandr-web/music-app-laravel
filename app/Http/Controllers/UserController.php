<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
}
