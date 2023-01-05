// connection to database
require('./../models/database/connect')
const env = require('./../env');
const User = require('./../models/userModel');

// menampilkan halaman login
const login = (req ,res ) => {    
        //check cookie
        if(req.cookies.user == 'admin'){
            return res.redirect('/admin')
        }else if(req.cookies.user == 'user'){
            return res.redirect('/')
        }else{
            return res.render('valid/login', {
                title : 'Login',
                layout: 'valid/template/main',
                foto : 'productivity.jpg',
                msg : req.session.massage
            });
        }

    
}

// memproses halaman login
const proseslogin = async (req,res) => {
    const errors  = env.validator.validationResult(req);
    //cek apakah valid email
    if (!errors.isEmpty()) {
        return res.render('valid/login', {
            title : 'Login',
            layout: 'valid/template/main',
            foto : 'productivity.jpg',
            errors : errors.array()
        });
      }
    
    const findUser =  await User.findOne({email:req.body.email})
    //mencari user berdasarkan email 
    if(!findUser){
        req.session.massage = 'Login Gagal'
        return res.redirect('/login');
    }

    //cek user
    if(findUser.password == req.body.password){
        res.cookie('user', findUser.role ,{ expires: new Date(new Date().getTime()+1000*60*60*24*365), httpOnly: true })
        res.cookie('data', req.body.email)        
        res.redirect('/');
    }else{
        req.session.massage = 'Login Gagal'
        return res.redirect('/login');
    }

}

//menampilkan halaman register

const regist = (req ,res ) => {
           //check cookie
        if(req.cookies.user == 'admin'){
            return res.redirect('/admin')
        }else if(req.cookies.user == 'user'){
            return res.redirect('/')         
        }else{
            return res.render('valid/regist', {
                title : 'Regist',
                layout: 'valid/template/main',
                foto: 'pexels-pixabay-268533.jpg',
                msg : req.session.massage
            });
        }

}

//memproses halaman register
const prosesregist = async (req,res) => {
    const errors  = env.validator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('valid/regist', {
            title : 'Regist',
            layout: 'valid/template/main',
            foto: 'pexels-pixabay-268533.jpg',
            errors : errors.array()
        });
      }
    
      const findUser =  await User.findOne({email:req.body.email})

      if (findUser) {
          req.session.massage = 'Email Sudah Terdaftar'
          return res.redirect('/regist')
      }

    const user = new User({
        _id : new env.mongoose.Types.ObjectId(),
        email : req.body.email,
        password : req.body.password,
        role : 'user'
    })
    try {
        const saveUser = await user.save();
        req.session.massage = 'Sukses Regist'
        return res.redirect('/login');
    } catch (error) {
        res
        .status(400)
        .send
        (error);
    }
    
}

const logout = (req,res) => {
    res.clearCookie('user');
    req.session.massage = 'Logout Berhasil'
    return res.redirect('/login')
}

module.exports = { login ,regist,proseslogin,prosesregist,login,logout}