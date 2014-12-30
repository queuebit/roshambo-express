## Roshambo with Node and Express
This is a simple test api-like app I am making after doing the [Code School Building Blocks of ExpressJS](http://campus.codeschool.com/courses/building-blocks-of-express-js) course.

The [Soup-to-Bits screencast](https://www.codeschool.com/screencasts/soup-to-bits-building-blocks-of-express-js) covers adding tests, deploying to heroku, and other npm goodness.

The app is deployed on [heroku](https://pacific-mesa-1393.herokuapp.com/roshambo) as well.

### Routes
* `/` --> Hello World
* `/roshambo` --> Rock, Paper, or Scissors please 
* `/roshambo/rock` --> You threw a rock, who knows what bot will throw.
* `/roshambo/stats` --> Who has been winning the most?

### Ideas for things to do
* Serve a static page where you can play in a client
  * Make the page more interactive and have it load the response in page
  * Show a history of the last 10 games using redis
* Add some logging using [morgan](https://github.com/expressjs/morgan)
* Add _secret_ weapons

### Done
* Add support for `*.ejs` templating
* Arrange roshambo into module

### Broken things
* Figure out why I need to get('/roshambo/') to get the tests to pass ('/roshambo' sends on a 303 to '/roshambo/')
* Figure out how to use [sinon stubs](http://sinonjs.org/docs/#stubs) to stub out calls to botThrows()
* Figure out how to handle roshambo/stats and roshambo/:weapon so order doesn't matter in app.js (some form of regex matching of route?)
