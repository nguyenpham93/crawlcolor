# Crawling_Nightmare
## Installation
Start a new Node project (npm init) and then install nightmare <br>
`npm install --save nightmare`
## Getting Started
* Require Nightmare `const Nightmare = require('nightmare')`
* Constructor a Nightmare object `let nightmare = new Nightmare()` ,using `new Nightmare({show : true})` to display workflow on VMWare
* Basic common function `goto(url) , wait() , type(selector,text) , click(selector)` etc
* Call `run(callback);`
This sample will simply load Google main page, wait for page loading, and tell us when it is done :
```
var Nightmare = require('nightmare');

var google = new Nightmare()
  .goto('http://google.com')
  .wait()
  .run(function(err, nightmare) {
    if (err) return console.log(err);
    console.log('Done!');
  });
```
## User Agents 
To run Nightmare on all different browsers(IE, mobile browser) using `.useragent(useragentString)` before `.goto(url)`
```
var google = new Nightmare()
  .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
  .goto('http://google.com')
  .wait()
```
## Screenshort
To get a screenshot of a website for debugging or something else <br>
using `.screenshot(filePath)`
```
var google = new Nightmare()
  .goto('http://google.com')
  .wait()
  .screenshot('googlePic.png')
  .run(function() console.log('Done!));
```
## Viewport
We can set the witdh and height for rendering screenshot by using <br>
`.viewport(width,height) method` this need to be called before `.goto(url)`
```
var google = new Nightmare()
  .screenshot(600, 400)
  .goto('http://google.com')
  .wait()
  .screenshot('google.png')
  .run(function() console.log('Done!));
```
## Form & Button
To click button using function `.click(selector)`, example button has class `signin menu-open`
```
var google = new Nightmare()
  .goto('https://www.foody.vn/ha-noi#/places')
  .wait()
  .click('.signin')
  .run(function(){
      console.log('Done!')
  });
```
![GitHub Logo](/music3.png)

To login form , using `.type(selector,text)` , login field has id `Email` and password field has id `Password` and then click signin submit 
```

var google = new Nightmare({show:true})
  .goto('https://www.foody.vn/ha-noi#/places')
  .wait()
  .click('.signin')
  .wait(1000)
  .insert('#Email','systemec2017@gmail.com')
  .type('#Password','rootvn')
  .click('#signin_submit')
  .wait(2000)
  .run(function(){
        console.log('Done!')
  });
```
![GitHub Logo](/picture.png)
