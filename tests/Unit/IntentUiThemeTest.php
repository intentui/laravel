<?php

test('semantic theme colors resolve in light and dark mode', function () {
    $stylesheet = file_get_contents(dirname(__DIR__, 2).'/resources/css/app.css');

    preg_match_all('/--color-[\w-]+:\s*var\((--[\w-]+)\);/', $stylesheet, $aliases);
    preg_match('/:root\s*\{([^}]+)\}/s', $stylesheet, $lightTheme);
    preg_match('/\.dark\s*\{([^}]+)\}/s', $stylesheet, $darkTheme);

    expect($aliases[1])->not->toBeEmpty();

    foreach ([$lightTheme[1], $darkTheme[1]] as $theme) {
        preg_match_all('/(--[\w-]+):/', $theme, $declarations);

        expect($declarations[1])->toEqual(array_values(array_unique($declarations[1])));

        foreach ($aliases[1] as $variable) {
            expect($declarations[1])->toContain($variable);
        }
    }
});
