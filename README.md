# Utilities and Stuffs
Some funny codes that will be helpful in some specific cases

Some of them are derived from my own extension and mod code, also from other sources if they're interesting
## Where I can test them?
For convenience, i've put all of these scripts to https://bhpsngum.github.io, you can visit this page to test them :D
## How to get script link

(for `<script>` tag in HTML files)

* **Step 1:** Find the repo link to the file:

For example: `/properVariableName/JS/getProperVariableName.js`

if you want a minified version: insert `.min` before the file extension,

if you want a utilized version: insert `.util` before the file extension

**Note:** both of them can be combined to create a utilized & minified file

For example: 
```
/getProperVariableName/JS/getProperVariableName.min.js
/newStringReplacer/JS/newStringReplacer.util.min.js
```
* **Step 2:** Append with `https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master` to create an URL

Combined with the examples above, we will have these URLs:
```
https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master/getProperVariableName/JS/getProperVariableName.min.js
https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master/newStringReplacer/JS/newStringReplacer.util.min.js
```
And you're done! :D
## Structure for one utility/stuff explanation

* **Language:** Language(s) the code is running or supporting (usually JS :D )
* **Requirements:** Some requirements when running those scripts (with the default one is the latest language version), these are maybe libraries, GPU cards, etc.
* **Syntax:** Syntax for that utility/stuff
* **Return value:** The value returned after executing that utility/stuff

There will be an example for easier understanding

* **Uses:** In which part that utility/stuff is used
* **Sensitive functions:** Some functions that you shouldn't modify so that the code can run properly (most of them are built-in functions)

**Note:** if you're ensure that your project/codes won't mess up any built-in functions, you can use the utilized version below this part

Got it? Now let's go! :D
## [getProperVariableName.js](/getProperVariableName/JS/getProperVariableName.js):

###Language 
JavaScript (ECMAScript)

###Requirements 
None

###Syntax
```string.getProperJSVariableName(mode)``` where `mode` is "strict" or none

###Return value
a string that can be set as JS Variable from your input string 

For example: 
```js
> "It's my funny variable name".getProperJSVariableName()
"It_s_my_funny_variable_name"
> "69 likes!".getProperJSVariableName()
"_69_likes_"
> "static".getProperJSVariableName()
"static"
> "static".getProperJSVariableName("strict")
"_static"
```
or if you want to call it as a property, you can use `myString.properJSVariableName` of `myString.properStrictJSVariableName` instead:
```js
> "It's my funny variable name".properJSVariableName
"It_s_my_funny_variable_name"
> "69 likes!".properJSVariableName
"_69_likes_"
> "static".properJSVariableName
"static"
> "static".properStrictJSVariableName
"_static"
```
###Uses
in my extension (Ship Editor sections) where users can name their ship like "69 is Legendary!" or "The 'Little' Hamster" and the modexport code return like
```js
var 69_is_Legendary!_696 = '{/*something*/}';
var The_'Little'_Hamster_969 = '{/*even more thing*/}';
```
which will return the `Unexpected identifier Error` when it came to Modding. So that how the code works: just edit the variable to a proper JS variable name :D
###Sensitive functions
```js
Error.prototype
eval
Object.defineProperties
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/getProperVariableName/JS/getProperVariableName.util.js).
## [newStringReplacer.js](/newStringReplacer/JS/newStringReplacer.js):

###Language
JavaScript (ECMAScript)

###Requirements
None

###Syntax

###Return value
a replaced string

For example: 

###Uses
for some cases that String replacement is more useful than Regular Expression replacement (like take input string, etc.)
###Sensitive functions
```js
String.prototype.replace (before script execution)
*.prototype.toString
String.prototype.oldReplace (after script execution)
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/newStringReplacer/JS/newStringReplacer.util.js).
