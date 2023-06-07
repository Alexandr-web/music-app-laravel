<?php
namespace App\Helpers;

use ReallySimpleJWT\Parse;
use ReallySimpleJWT\Decode;
use ReallySimpleJWT\Jwt;

class AuthToken {
    static function get() {
        if (!array_key_exists('token', $_COOKIE)) {
            return '';
        }

        return $_COOKIE['token'];
    }

    static function decode(string $token) {
        if (!$token) {
            return null;
        }

        $jwt = new Jwt($token);
        $parse = new Parse($jwt, new Decode());
        $parsed = $parse->parse();

        return $parsed->getPayload();
    }
}