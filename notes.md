initialize a git hub repo

.gitignore file for shit to ignore

/app folder - js, scss

~/app/js - script.js

~/app/scss - style.scss

~/app/scss - folders util, globals, components - \_index.scss in each style.scss in /scss folder

@use ''; folders into main style.scss

util folder - add breakpoints,
functions .scss files

@forward ''; those files into util folder \_index.scss

/globals folder - add boilerplate, colors, fonts, layout, typography .scss files

@forward ''; each into globals \_index.scss file
do color, fonts variables

general reset - boilerplate, typography .scss files

/components folder - the components you gonna need/do

@forward ''; components files into main /components \_index.scss

IMPORTANT  
for the pixel/rem converter to work you need to add (on top of file)
@use '../util' as \*;

(everywhere you gonna be using it)

create /dist folder (all minified scss/css files gonna go there)

link stylesheets/script in <head>

GULP WORKFLOW
in terminal:
npm install gulp-cli -g //this is for installing gulp only - only need to do it once

npm init -y

npm install @babel/core @babel/preset-env postcss autoprefixer browser-sync cssnano dart-sass gulp gulp-babel gulp-postcss gulp-sass gulp-terser

//all of this is added to package.json file

npm audit
npm audit fix

//if there are any vulnerabilities

add gulpfile.js - add shit to initialize it - just copied and pasted from coder coder

IMPORTANT
if breakpoints arent working is most likely because you have to add a @use '../util' as \*; on top of each partial
also do not use that px to rem converter formula
