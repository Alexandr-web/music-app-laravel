<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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

		return view('user', ['current_user' => $current_user, 'user' => $find_user, 'is_guest' => $is_guest, 'active_tab' => htmlspecialchars($_GET['tab'] ?? 'audio')]);
	}
}
