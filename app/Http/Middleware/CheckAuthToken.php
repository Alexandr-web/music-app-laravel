<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Helpers\AuthToken;

class CheckAuthToken extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $auth_header = $request->header('Authorization') ?? '';
        $token = str_replace('Bearer ', '', $auth_header);
        $token_data = AuthToken::decode($token);

        if ($token_data) {
            $user_id = $token_data['user_id'];
            $find_user = User::find($user_id);

            $request->is_authenticated = (bool) $find_user;
            $request->user = $find_user;
        }

        return $next($request);
    }
}
