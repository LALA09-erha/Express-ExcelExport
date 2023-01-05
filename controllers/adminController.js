const e = require('connect-flash');
const env = require('./../env')
const User = require('./../models/userModel');

const index = (req,res) => {
  //check cookie
  if(req.cookies.user == 'admin'){
    // return res.send (req.cookies.data)
    return res.render('admin/index',{
        title: 'Home | Admin',
        layout: 'admin/template/main',
        msg : req.session.massage,
        email_user: req.cookies.data

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
        data: data_users,
        msg : req.session.massage,
        email_user: req.cookies.data

    })
  }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
  }
}

const adduser = (req,res) => {
  //check cookie
  if(req.cookies.user == 'admin'){

    return res.render('admin/adduser',{
        title: 'User | Add User',
        layout: 'admin/template/main',
        msg : req.session.massage,
        email_user: req.cookies.data

    })
  }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
  }
}

// proses add
const prosesadd = async (req,res) => {
  // check cookie
  if(req.cookies.user == 'admin'){
    const errors  = env.validator.validationResult(req);
    if (!errors.isEmpty()) {
        req.session.massage = 'Email Tidak Valid'
        return res.redirect('/adduser')
    }

    //cek email
    var cekemail = await User.findOne({email:req.body.email})
    // return res.send(cekemail._id)
    if(cekemail){
      req.session.massage = 'Email Sudah Terdaftar'
      res.redirect('/adduser')
    }else{
      var data = {
        _id : new env.mongoose.Types.ObjectId(),
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
      }
      /// menambahkan user baru
      var user= new User(data);
      user.save();
      req.session.massage = 'User Berhasil Ditambahkan'
      return res.redirect('/users');
    }
  }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
  }
  }

//edit user
const edituser = async (req,res) => {
    //check cookie
    if(req.cookies.user == 'admin'){
      var data = await User.findOne({_id:req.params.id})
      // return res.send(data)
      return res.render('admin/edituser',{
          title: 'User | Edit User',
          layout: 'admin/template/main',
          msg : req.session.massage,
          user:data,
          email_user: req.cookies.data
  
      })
    }else{
          req.session.massage = 'Login Terlebih Dahulu'
          res.redirect('/login')
    }
}

//proses edit user
const prosesedituser = async (req,res) => {
    //check cookie
    if(req.cookies.user == 'admin'){
     var userold = await User.findOne({_id:req.body.id})
     
     // cek apakah ada perubahan password atau role 
     if(userold.password == req.body.password && userold.role == req.body.role){
        req.session.massage= 'Data User Tidak Berubah'
        return res.redirect('/users')
     }else{
        // edit user didatabase 
        var data = {
          password:req.body.password,
          role:req.body.role
        }
        await User.updateOne({_id:req.body.id},data)
        req.session.massage = 'User Berhasil Diubah'
        return res.redirect('/users')
     }

    
    }else{
          req.session.massage = 'Login Terlebih Dahulu'
          res.redirect('/login')
    }
}


//proses delete user 
const deleteuser = async (req,res) => {
    //check cookie
    if(req.cookies.user == 'admin'){
      await User.deleteOne({_id:req.params.id})
      req.session.massage = 'User Berhasil Dihapus'
      return res.redirect('/users')
    }else{
          req.session.massage = 'Login Terlebih Dahulu'
          res.redirect('/login')
    }
}
module.exports = {index,users , adduser , prosesadd , edituser,prosesedituser,deleteuser}