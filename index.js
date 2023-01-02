// all environments
const env  =  require('./env');
var app = env.express()
app.set('port', process.env.PORT || 3000)

// routes
var routes = require('./routes/routes')
// to login
app.use(routes.login);
// // to regist
app.use(routes.regist)
// //to home
app.use(routes.home);
// // to admin
app.use(routes.admin);
//to users 
// app.use(routes.users);

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(env.errorHandler())
}


// start server
var server = env.http.createServer(app)
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port') + ' =>  http://localhost:'+app.get('port'))
})