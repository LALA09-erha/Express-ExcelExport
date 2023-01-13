const e = require('connect-flash');
const { response } = require('express');
const env = require('./../env')
const Items = require('./../models/itemModel');


// login page
const index = (req,res) => {
  //check cookie
  // console.log(req.cookies.user);
  if(req.cookies.user == 'Admin'){
    const items = Items.findAll();
    items.then((result) => {
      return res.render('admin/index', {
        title: 'Home | Admin',
        layout: 'admin/template/main',
        data: result,
        msg : req.session.massage,
        email_user: req.cookies.data
      })
    });
    }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
    }
}

// l
const users = async (req,res) => {
      //check cookie
  if(req.cookies.user == 'Admin'){

    // var data_users = await User.find();
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
  if(req.cookies.user == 'Admin'){

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
  if(req.cookies.user == 'Admin'){
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
    if(req.cookies.user == 'Admin'){
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
    if(req.cookies.user == 'Admin'){
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
    if(req.cookies.user == 'Admin'){
      await User.deleteOne({_id:req.params.id})
      req.session.massage = 'User Berhasil Dihapus'
      return res.redirect('/users')
    }else{
          req.session.massage = 'Login Terlebih Dahulu'
          res.redirect('/login')
    }
}

const uploadfile = (req,res) => {
  //check cookie
  if(req.cookies.user == 'Admin'){
    //check file upload
    if(!req.files){
      req.session.massage = 'File Tidak Ada'
      return res.redirect('/admin')
    }
    //menyimpan file
    var file = req.files.files;
    var filename = file.name;

    var path = './public/files/'+filename;
    file.mv(path,function(err){
      if(err){
        req.session.massage = 'File Gagal Diupload'
        return res.redirect('/admin')
      }else{
        // membaca file excel
        var workbook = env.xlsx.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        var xlData = env.xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        //mengambil data dari file exce
        var items = [];
        for (i = 0; i < xlData.length; i++) {
          items.push(xlData[i].namaitem);
        }

        var namaitems = Items.getnamaitem();
        namaitems.then(function (result) {
          const itemss = [];
          // insert result to array itemss
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const element = result[key];
              if(itemss.includes(element.namaitem) == false){
                itemss.push(element.namaitem);
              }
            }
          }
          // console.log(items);
          // check result items  
          for (i = 0; i < items.length; i++) {
            // console.log(items[i]);
            var checknama = Items.updatejumlahitem(items[i]);

            checknama.then(function (result) {
              //get namaitem di result        
              if(result.length == 0){
                // console.log('Data Tidak Ada');
                 //// save to db 
                // mengambil data sheet pertama
                var xlData = env.xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                // parsing data
                for (const key in xlData) {
                  if (xlData.hasOwnProperty(key)) {
                    const element = xlData[key];
                    // console.log(element);
                    var deff = items.filter(x => !itemss.includes(x));
                    if(deff.includes(element.namaitem) == true){

                    var item = Items.insert(element);
                    item.then(function (result) {
                      // console.log(result);
                    }).catch(function (err) {
                      console.log('Data Gagal Diupload');
                    });
                  }
                  }  
                }
              }else{
                //mengambil jumlahitem dari result 
                var jumlahitem = result[0].jumlahitem;
                
                //mengambil data sheet pertama
                var xlData = env.xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                // parsing data
                var data = [];
                for (const key in xlData) {
                  if (xlData.hasOwnProperty(key)) {
                    const element = xlData[key];
                    if(element.namaitem == result[0].namaitem){
                      jumlahitem = Number(jumlahitem) + Number(element.jumlahitem);
                      //update jumlah item
                      var updatejumlah = Items.updatejumlahitemfix(jumlahitem,element.namaitem);
                      updatejumlah.then(function (result) {
                        // console.log(result);
                      }
                      ).catch(function (err) {
                        console.log(err);
                      });
                    }}
                }
              }
            }).catch(function (err) {
              console.log(err);
            });
          }
          // console.log(result); 
        }).catch(function (err) {
          console.log(err);
        });

       req.session.massage = 'File Berhasil Diupload'
       return res.redirect('/admin')
      }
    })


  }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
  }
}
module.exports = {index,users , adduser , prosesadd , edituser,prosesedituser,deleteuser,uploadfile}