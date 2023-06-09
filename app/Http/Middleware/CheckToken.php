<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Utils\AuthToken;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class CheckToken
{
	public function handle(Request $request, Closure $next) {
		$auth_header = $request->header("Authorization") ?? "";
		$token = str_replace("Bearer ", "", $auth_header);
		$decode_token = AuthToken::decode($token);

		
	}
}