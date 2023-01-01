
var env = require('../env')
const validController = require('../controllers/validController');
const homeController = require('../controllers/homeController');
const adminController = require('../controllers/adminController');



//router for home
const home = env.app.get('/', homeController.index);
// router for validoation

//regist route

const regist = env.app.get('/regist', validController.regist);

// proses regist route dan middleware validasi email
const prosesregist = env.app.post('/prosesregist',
                env.validator.check('email','Email Tidak Valid').isEmail(),
                validController.prosesregist)

// login route

const login = env.app.get('/login', validController.login);

//proses login route 
const proseslogin = env.app.post('/proseslogin',env.validator.check('email','Email Tidak Valid').isEmail() ,validController.proseslogin)

//proses logout route
const logout = env.app.post('/logout',validController.logout);

//proses admin route
const admin = env.app.get('/admin', adminController.index)

module.exports = {login ,home,regist ,proseslogin,prosesregist,logout,admin}
