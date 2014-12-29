## Roshambo with Node and Express
This is a simple test api-like app I am making after doing the [Code School Building Blocks of ExpressJS](http://campus.codeschool.com/courses/building-blocks-of-express-js) course.

The app is deployed on [heroku](https://pacific-mesa-1393.herokuapp.com/roshambo) as well.

* [Screencast bookmark](https://www.codeschool.com/screencasts/soup-to-bits-building-blocks-of-express-js):56m05s

### Routes
* `/` --> Hello World
* `/roshambo` --> Rock, Paper, or Scissors please 
* `/roshambo/penny` --> You threw a penny

### Ideas for things to do
* Serve a static page where you can play in a client
  * Make the page more interactive and have it load the response in page
  * Show a history of the last 10 games using redis
* Add some logging using [morgan](https://github.com/expressjs/morgan)
* Add _secret_ weapons


### Broken things
* Figure out why I need to get('/roshambo/') to get the tests to pass ('/roshambo' sends on a 303 to '/roshambo/')
* Figure out how to use [sinon stubs](http://sinonjs.org/docs/#stubs) to stub out calls to botThrows()
