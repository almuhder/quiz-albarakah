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
    */
    public function register(): void
    {
        Passport::ignoreRoutes();
    }

    public function boot()
    {
        $this->registerPolicies();
        Passport::tokensCan([
            'admin' => 'admin',
            'student' => 'student',
        ]);

        //
    }
}
