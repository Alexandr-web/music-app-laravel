<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\AuthToken;

class CheckAuthToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization') ?? '';
        $token = str_replace('Bearer ', '', $authHeader);
        $tokenData = AuthToken::decode($token);

        if ($tokenData) {
            $userId = $tokenData['user_id'];
            $findUser = Student::find($userId);

            $request->isAuthenticated = (bool) $findUser;
            $request->user = $findUser;
        }

        return $next($request);
    }
}
