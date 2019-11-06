const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
const files = [
'./dist/angular/runtime.js',
'./dist/angular/polyfills.js',
'./dist/angular/scripts.js',
'./dist/angular/main.js',
]
await fs.ensureDir('elements')
await concat(files, 'elements/testcomp-angular.js');
await fs.copyFile('./dist/angular-elements/styles.css', 'elements/styles.css')
await fs.copy('./dist/angular-elements/assets/', 'elements/assets/' )
})()
