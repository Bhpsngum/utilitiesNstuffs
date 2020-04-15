# Utilities and Stuffs
Some funny codes that will be helpful in some specific cases

Some of them are derived from my own extension and mod code, also from other sources if they're interesting

Feel free to contribute your idea by creating pull requests or open new issues, it would be appericated! :D

<details>
  <summary markdown="span">Table of contents</summary>
  
  **[Where I can test them?](#where-i-can-test-them)**

  **[How to get script link](#how-to-get-script-link)**
  
  **[Structure for one utility/stuff explanation](#structure-for-one-utilitystuff-explanation)**
  
  **[getProperVariableName.js](#getpropervariablename-js-only)**
  
  <details>
    <summary markdown="span">Contents</summary>
 
   * **[Languages](#languages)**
    
   * **[Requirements](#requirements)**
   
   * **[Syntax](#syntax)**
   
   * **[Return value](#return-value)**
   
   * **[Examples](#examples)**
   
   * **[Sensitive functions](#sensitive-functions)**
   
  </details>
  
  **[newStringReplacer.js](#newstringreplacerjs)**
  
  <details>
    <summary markdown="span">Contents</summary>
 
   * **[Languages](#languages-1)**
    
   * **[Requirements](#requirements-1)**
   
   * **[Syntax](#syntax-1)**
   
   * **[Return value](#return-value-1)**
   
   * **[Examples](#examples-1)**
   
   * **[Sensitive functions](#sensitive-functions-1)**
   
  </details>
</details>

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

**Another note:** Minified version is not up-to-date very often due to jsDelivr's latency (1-3 days for update), use the main or utilised version instead.
## Structure for one utility/stuff explanation

* **Languages:** Language(s) the code is running or supporting (usually JS :D )
* **Requirements:** Some requirements when running those scripts (with the default one is the latest language version), these are maybe libraries, GPU cards, etc.
* **Syntax:** Syntax for that utility/stuff
* **Return value:** The value returned after executing that utility/stuff

* **Examples:** There will be an example here for easier understanding

* **Uses:** In which part that utility/stuff is used
* **Sensitive functions:** Some functions that you shouldn't modify so that the code can run properly (most of them are built-in functions)

**Note:** if you're ensure that your project/codes won't mess up any built-in functions, you can use the utilized version below this part

Got it? Now let's go! :D
## [getProperVariableName (JS Only)](https://bhpsngum.github.io/util/getProperJSVariableName/)

### Languages
JavaScript (ECMAScript)

### Requirements 
None

### Syntax
```string.getProperJSVariableName(mode)``` where `mode` is "strict" or omitted

### Return value
a string that can be set as JS Variable from your input string 

### Examples
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
or if you want to call it as a property, you can use `myString.properJSVariableName` or `myString.properStrictJSVariableName` instead:
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
### Uses
in my extension (Ship Editor sections) where users can name their ship like "69 is Legendary!" or "The 'Little' Hamster" and the modexport code return like
```js
var 69_is_Legendary!_696 = '{/*something*/}';
var The_'Little'_Hamster_969 = '{/*even more thing*/}';
```
which will return the `Unexpected identifier Error` when it came to Modding. So that how the code works: just edit the variable to a proper JS variable name :D
### Sensitive functions
```js
Error.prototype
eval
Object.defineProperties
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/getProperVariableName/JS/getProperVariableName.util.js).
## [newStringReplacer.js](/newStringReplacer/JS/newStringReplacer.js)
Provide a new powerful function for string replacement while keeping the old `string.replace` function for Regular Expression (RegExp)
### Languages
JavaScript (ECMAScript)

### Requirements
None

### Syntax
`myString.replace(RegExp,replaceparam)` (casual funtion)

`myString.replace(FinderString,flags,replaceparam)` (replace with non-RegExp finder) where:
* **`FinderString`** : String (or non-RegExp) in the string that need to be replaced
* **`flags`** : flags for replacement preferences (must be a String).

  This parameter can be omitted

  Available flags:
  * `g` : Global - finds every occurence of the search parameter in a string
  * `b` : Beginning - matches only at the beggining of the string
  * `e` : Ending - matches only at the end of the string
  * `m` : Multiline (available for `b` and `e` flags) - treats one line as a main string
  * `i` : case-Insensitive - matches every results regardless of Lowercase or Uppercase form
  
   **Notes:**
    * A combination of both `b` and `e` flags can be called as the "Full String replacement" (except when `m` flag is enabled)
    * `b` and `e` flags can be used for new line if `m` flag is enabled.
* **`replaceparam`** : parameter which need to replace with the results, this can be a string or a function (like with RegExp replacement)

### Return value
a replaced string

### Examples
```js
> "12121212".replace("12","here")
"here121212"
> "12121212".replace("12","g","test")
"testtesttesttest"
> "12\n12\n12\n12".replace("12","gb","test")
"test
12
12
12"
> "12\n12\n12\n12".replace("12","gmb","test")
"test
test
test
test"
> "1111111111".replace("1","g", function(result,index){return result+index})
"10111213141516171819"
> "This is a sample string for tHiS case-insensitive replacement".replace("this","gi","that")
"that is a sample string for that case-insensitive replacement"
```
or if you prefer using old replace function, use `string.oldReplace`
```js
> "121212".oldReplace("12","alpha")
"alpha1212"
```
and if you don't make sure that the script is loaded or not, use the method below:
```js
// <script> tag is is loaded... or not?
> ("uistui".oldReplace)?"uistui".oldReplace("ui","fir"):"uistui".replace("ui","fir")
"firstui"
```
### Uses
for some cases that String replacement is more useful than Regular Expression replacement (like take input string, etc.)
### Sensitive functions
```js
String.prototype.replace (before script execution)
*.prototype.toString
String.prototype.toUpperCase
RegExp.prototype
String.prototype.oldReplace (after script execution)
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/newStringReplacer/JS/newStringReplacer.util.js).
