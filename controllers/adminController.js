const env = require('./../env')
const User = require('./../models/userModel');

const index = (req,res) => {
  //check cookie
  if(req.cookies.user == 'admin'){
    return res.render('admin/index',{
        title: 'Home | Admin',
        layout: 'admin/template/main'

    })
    }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
    }
}

const users = async (req,res) => {
      //check cookie
  if(req.cookies.user == 'admin'){

    var data_users = await User.find();
    return res.render('admin/users',{
        title: 'Home | Users',
        layout: 'admin/template/main',
        data: data_users

    })
  }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
  }
}

module.exports = {index,users}