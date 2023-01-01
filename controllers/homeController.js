const env = require('./../env')

const index = (req,res) => {
    //check cookie
    if(req.cookies.user == 'user'){
        return res.render('home/index',{
            title: 'Home',
            layout: 'home/template/main'
        })
    }else{
        req.session.massage = 'Login Terlebih Dahulu'
        res.redirect('/login')
    }
}

module.exports = { index }