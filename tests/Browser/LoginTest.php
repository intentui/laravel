<?php

use App\Models\User;

test('login page can be visited', function () {
    $page = visit('/login');
    
    $page->assertSee('Login')
         ->assertSee('Sign in with your email or continue with a connected account.');
});

test('user can login with valid credentials', function () {
    User::factory()->create([
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $page = visit('/login');

    $page->type('[name="email"]', 'test@example.com')
         ->type('[name="password"]', 'password')
         ->submit()
         ->wait(3)
         ->assertUrlIs(url('/dashboard'));
});

test('user cannot login with invalid credentials', function () {
    User::factory()->create([
        'email' => 'test@example.com', 
        'password' => 'password',
    ]);

    $page = visit('/login');

    $page->type('[name="email"]', 'test@example.com')
         ->type('[name="password"]', 'wrong-password')
         ->submit()
         ->wait(2)
         ->assertUrlIs(url('/login'));
});

test('login form shows validation errors for empty fields', function () {
    $page = visit('/login');

    $page->submit()
         ->wait(2)
         ->assertSee('Please fill out this field.')
         ->assertUrlIs(url('/login'));
});
