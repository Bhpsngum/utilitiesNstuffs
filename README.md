# Ultities and Stuffs
Some funny codes that will be helpful in some specific cases

Some of them are derived from my own extension and mod code, also from other sources if they're interesting
## Where I can test them?
For convenience, i've put all of these script to https://bhpsngum.github.io, you can visit this page to test them :D
## [getProperJSVariableName.js](getProperJSVariableName.js):
Script link (use in html files): https://cdn.jsdelivr.net/gh/Bhpsngum/UltitiesNstuffs@latest/getProperJSVariableName.min.js

Language: JavaScript (ECMAScript)

Syntax: ```string.getProperJSVariableName(mode)``` where `mode` is "strict" or none

Return value: a string that can be set as JS Variable from your input string 

For example: 
```js
> "It's my funny variable name".getProperJSVariableName()
"It_s_my_funny_variable_name"
> "69 likes!".getProperJSVariableName()
"_69_likes_"
> "let".getProperJSVariableName()
"let"
> "let".getProperJSVariableName("strict")
"_let"
```
Uses: in my extension (Ship Editor sections) where users can name their ship like "69 is Legendary!" or "The 'Little' Hamster" and the modexport code return like
```js
var 69_is_Legendary!_696 = '{/*something*/}';
var The_'Little'_Hamster_969 = '{/*even more thing*/}';
```
which will return the `Unexpected identifier Error` when it came to Modding. So that how the code works: just edit the variable to a proper JS variable name :D
