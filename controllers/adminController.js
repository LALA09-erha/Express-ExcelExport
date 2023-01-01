const env = require('./../env')

const index = (req,res) => {
  //check cookie
  res.send('Admin')
//   if(req.cookies.user == 'admin'){
//     return res.render('admin/index',{
//         title: 'Home | Admin',
//         layout: 'admin/template/main'
//     })
//     }else{
//         req.session.massage = 'Login Terlebih Dahulu'
//         res.redirect('/login')
//     }
}

module.exports = {index}