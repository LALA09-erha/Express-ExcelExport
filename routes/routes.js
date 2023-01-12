
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

// admin route
const admin = env.app.get('/admin', adminController.index)

// users route
const users = env.app.get('/users' , adminController.users)

// add user route
const adduser = env.app.get('/adduser', adminController.adduser)

// proses add user route
const prosesadduser = env.app.post('/prosesadd',env.validator.check('email','Email Tidak Valid').isEmail(),adminController.prosesadd)

//edit user route
const edituser = env.app.get('/editusers/:id',adminController.edituser)

//proses edit user route
const prosesedituser = env.app.post('/prosesedituser',adminController.prosesedituser)

//delete user route
const deleteuser = env.app.get('/deleteusers/:id',adminController.deleteuser)

//upload file route
const uploadfile = env.app.post('/uploadfile',adminController.uploadfile)

module.exports = {login ,home,regist ,proseslogin,prosesregist,logout,admin,users,adduser,prosesadduser,edituser}
