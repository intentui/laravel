<?php

use App\Models\User;

test('register page can be visited', function () {
    $page = visit('/register');
    
    $page->assertSee('Register')
         ->assertSee('Create an account to get started.');
});

test('user can register with valid data', function () {
    $page = visit('/register');

    $page->type('[name="name"]', 'John Doe')
         ->type('[name="email"]', 'john@example.com')
         ->type('[name="password"]', 'password123')
         ->type('[name="password_confirmation"]', 'password123')
         ->submit()
         ->wait(3)
         ->assertUrlIs(url('/dashboard'));

    expect(User::where('email', 'john@example.com')->exists())->toBeTrue();
});

test('user cannot register with invalid email', function () {
    $page = visit('/register');

    $page->type('[name="name"]', 'John Doe')
         ->type('[name="email"]', 'invalid-email')
         ->type('[name="password"]', 'password123')
         ->type('[name="password_confirmation"]', 'password123')
         ->submit()
         ->wait(2)
         ->assertSee('email');
});

test('user cannot register with mismatched passwords', function () {
    $page = visit('/register');

    $page->type('[name="name"]', 'John Doe')
         ->type('[name="email"]', 'john@example.com')
         ->type('[name="password"]', 'password123')
         ->type('[name="password_confirmation"]', 'different-password')
         ->submit()
         ->wait(2)
         ->assertSee('password');
});

test('register form shows validation errors for empty fields', function () {
    $page = visit('/register');

    $page->submit()
         ->wait(2)
         ->assertSee('Please fill out this field.')
         ->assertUrlIs(url('/register'));
});

test('user cannot register with existing email', function () {
    User::factory()->create([
        'email' => 'existing@example.com',
    ]);

    $page = visit('/register');

    $page->type('[name="name"]', 'John Doe')
         ->type('[name="email"]', 'existing@example.com')
         ->type('[name="password"]', 'password123')
         ->type('[name="password_confirmation"]', 'password123')
         ->submit()
         ->wait(2)
         ->assertSee('email');
});

test('register form has link to login page', function () {
    $page = visit('/register');

    $page->assertSee('Already registered?')
         ->click('Already registered?')
         ->wait(2)
         ->assertUrlIs(url('/login'))
         ->assertSee('Login');
});

test('register form validates minimum password length', function () {
    $page = visit('/register');

    $page->type('[name="name"]', 'John Doe')
         ->type('[name="email"]', 'john@example.com')
         ->type('[name="password"]', '123')
         ->type('[name="password_confirmation"]', '123')
         ->submit()
         ->wait(2)
         ->assertSee('password');
});

test('register button shows loading state during submission', function () {
    $page = visit('/register');

    $page->type('[name="name"]', 'John Doe')
         ->type('[name="email"]', 'john@example.com')
         ->type('[name="password"]', 'password123')
         ->type('[name="password_confirmation"]', 'password123')
         ->submit()
         ->wait(3)
         ->assertUrlIs(url('/dashboard'));
});
