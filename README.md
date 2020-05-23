# Utilities and Stuffs
Some funny codes that will be helpful in some specific cases

Some of them are derived from my own extension and mod code, also from other sources if they're interesting

Feel free to contribute your idea by creating pull requests or open new issues, it would be appericated! :D

<details>
  <summary markdown="span">Table of contents</summary>
  
  **[Where I can test them?](#where-i-can-test-them)**

  **[How to get script link](#how-to-get-script-link)**
  
  **[Structure for one utility/stuff explanation](#structure-for-one-utilitystuff-explanation)**
  
  **[Contribution](#contribution)**
  
  **[getProperVariableName (JS Only)](#getpropervariablename-js-only)**
  
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
  
  **[ObjectFinder](#objectfinder)**
  
  <details>
    <summary markdown="span">Contents</summary>
 
   * **[Languages](#languages-2)**
    
   * **[Requirements](#requirements-2)**
   
   * **[Syntax](#syntax-2)**
   
   * **[Return value](#return-value-2)**
   
   * **[Examples](#examples-2)**
   
   * **[Sensitive functions](#sensitive-functions-2)**
   
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
* **Step 2:** Append with `https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@latest` to create an URL

Combined with the examples above, we will have these URLs:
```
https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@latest/getProperVariableName/JS/getProperVariableName.min.js
https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@latest/newStringReplacer/JS/newStringReplacer.util.min.js
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
## Contribution

You can report the bug or issues of those function below in [issues](https://github.com/Bhpsngum/utilitiesNstuffs/issues)

or if you can fix it, you can [fork this repository](https://github.com/Bhpsngum/utilitiesNstuffs/fork) then create [pull requests](https://github.com/Bhpsngum/utilitiesNstuffs/pulls)

If you do well, your pull requests will be accepted and you'll be one of the contributors!

Got it? Now let's go! :D
## [getProperVariableName (JS Only)](https://bhpsngum.github.io/util/getProperJSVariableName/)

### Languages
[JavaScript (ECMAScript)](/getProperVariableName/JS/getProperVariableName.js)

### Requirements 
None

### Syntax
```string.getProperJSVariableName(mode,strictImmutable)``` where:
* **`mode`** : specify JavaScript mode, "strict" or omitted
* **`strictImmutable`**: in case of your input string is a immutable variable (global objects or properties of them), Your string will be converted to mutable variable name. `true`, `false` or omited. Set to true to create mutable variable

  **Notes:** you can also use falsy values instead of omit the parameter (`null`,`undefined`,`0`,etc.)

### Return value
An object with 3 properties:
* **`name`** (String) : a string that can be set as JS Variable from your input string 
* **`mutable`** (Boolean): Indicates if the input variable name is mutable or not.

  In addition, a warning will be displayed in a console for more information
* **`proper`** (Boolean) : Indicates if the input is a proper JavaScript variable name or not.

### Examples
```js
> "It's my funny variable name".getProperJSVariableName().name
"It_s_my_funny_variable_name"

> "69 likes!".getProperJSVariableName()
{name: "_69_likes_", proper: false, mutable: true}

> "static".getProperJSVariableName()
{name: "static", proper: true, mutable: true}

> "static".getProperJSVariableName("strict")
{name: "_static", proper: false, mutable: true}

> "window".getProperJSVariableName()
{name: "window", proper: true, mutable: false}

> "window".getProperJSVariableName("strict",true);
{name: "_window", proper: true, mutable: true}
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
Error
eval
console.warn
Object.defineProperties
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/getProperVariableName/JS/getProperVariableName.util.js).
## [newStringReplacer.js](/newStringReplacer/JS/newStringReplacer.js)
Provide a new powerful function for string replacement while keeping the old `string.replace` function for Regular Expression (RegExp)
### Languages
[JavaScript (ECMAScript)](/newStringReplacer/JS/newStringReplacer.js)

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
RegExp
String.prototype.oldReplace (after script execution)
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/newStringReplacer/JS/newStringReplacer.util.js).

## [ObjectFinder](/ObjectFinder/JS/ObjectFinder.js)
Provide a new powerful function for finding properties in the object
### Languages
[JavaScript (ECMAScript)](/ObjectFinder/JS/ObjectFinder.js)

### Requirements
None

### Syntax
`object.get(SearchQuery,isGlobalSearch)` where:
* **`SearchQuery`** : String or Array (any others will be converted to string) for searching.
  * **String**: If you want to search the first-level property of an object or do a global search (see `isGlobalSearch` below)
  * **Array**: defines the search tree from the highest level property in the first element of an array to the lowest one in the last element.
* **`isGlobalSearch`** (`Boolean` - if `SearchQuery` is not an array) : Search for every properties in all levels that have the name matches with the query.

### Return value
Depends on the value of `isGlobalSearch`:
* `false` : value of the property
* `true` : An array with each element is an object contains 2 properties:
  * `path` : An array shows the path of the property (like array `SearchQuery`)
  * `value` : The values that comes along with the path above

### Examples
```js
> {a:1}.get("a")
1
> {a:1}.get("b")
undefined
> let object = {a:{a:{b:{c:{d:{a:1}}}}}}
undefined
> object.get("a",true)
Array (3)
  0:
    path: ["a"]
    value: {a: {b: {c: {d: {a: 1}}}}}
  1:
    path: ["a","a"]
    value: {b: {c: {d: {a: 1}}}}
  2:
    path: ["a","a","b","c","d","a"]
    value: 1
> object.get(["a","a","b","c","d"])
{a: 1}
```
### Uses
More efficiency object gathering and lower chance of getting errors.
### Sensitive functions
```js
Array.from
Array.isArray
*.prototype.toString
WeakMap
Object.prototype.toString.call
Object.keys
```
if you're ensure that your project/codes won't mess up any built-in functions, use the [utilised version](/ObjectFinder/JS/ObjectFinder.util.js).

