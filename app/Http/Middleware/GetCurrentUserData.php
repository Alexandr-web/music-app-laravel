<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\AuthToken;
use App\Models\User;

class GetCurrentUserData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
		$token = AuthToken::get() ?? '';
        $token_data = AuthToken::decode($token);
        $find_user = User::find($token_data['user_id']);

        $request->user = json_decode($find_user, true);

        return $next($request);
    }
}
