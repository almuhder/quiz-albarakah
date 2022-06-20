<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
//        Passport::tokensExpireIn(now()->addMinutes(60));
//        Passport::refreshTokensExpireIn(now()->addMinutes(60));
//        Passport::personalAccessTokensExpireIn(now()->addMinutes(60));
        Passport::tokensCan([
            'admin' => 'admin',
            'student' => 'student',
        ]);
//        Passport::tokensCan([
//            'student' => 'Student User Type',
//            'admin' => 'Admin User Type',
//        ]);

        //
    }
}
