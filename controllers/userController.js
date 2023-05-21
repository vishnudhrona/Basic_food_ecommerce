var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/userHelper')
var adminHelpers = require('../helpers/adminHelpers')
const flash = require('connect-flash')


let userHome = (req, res) => {
    let logIn = req.session.user
    adminHelpers.getAllProduct().then(async(products) => {
        console.log(products , "aaaaaaaaaa");
        res.render('user/userHome',{ products,logIn })
    })
}

/* userSignUp Section */
let userSignup = (req, res) => {
 res.render('user/userSignup')
}

let userSignupPost = (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {
        console.log(response,'aaaaammmmmmmmmmmmmm');
        res.redirect('/userlogin')
    })
}
/*End userSignup section*/

/*userLogin section*/
let userLogin = (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
        res.render('user/userLogin')
    }
}

let userLoginPost = (req, res) => {
    userHelpers.userLoginPost(req.body).then((response) => {
        console.log(response,'vvvvvvvvvrrrrrrrrrrrrrr'); 
        if(response.status){
            req.session.loggedIn = true
            req.session.user = response.user
            console.log(req.session.user,'eeeeeeeeeeeeeeeeexxxxxxxxxxxx');
            res.redirect('/')
        }else{
            res.redirect('/userlogin')
        }
    })
}

let userLogout = (req,res) => {
    req.session.destroy()
    res.redirect('/userlogin')
}
/*End userLogin section*/



let chinese = (req , res) => {
    console.log(req.body , "aaaa");
    userHelpers.getChinese(req.body).then((products) => {
        res.render('user/userHome',{products })
    })
}

let spicy = (req , res) => {
    userHelpers.getSpicy(req.body).then((products) => {
        res.render('user/userHome',{products })
    })
}

let noodles = (req , res) => {
    userHelpers.getNoodles(req.body).then((products) => {
        res.render('user/userHome',{products })
    })
}

let userProfile = (req, res) => {
     logIn = req.session.user
    res.render('user/userProfile',{logIn})
}

let editProfile = (req, res) => {
    logIn = req.session.user
    res.render('user/editProfile',{logIn})
}

let editProfilePost = async (req, res) => {
    let profileId = req.query.id
    let modprofile = await userHelpers.updateProfile(req.body, profileId)
    let moduser = await userHelpers.getOneUsers(profileId)
    req.session.logIn = moduser
    console.log(req.session.logIn,'ggggggffffffff');
    console.log(moduser,'mmmmmmmmmmmnnnnnnnbbbb');
        res.redirect('/userprofile')
}








module.exports = {
    userHome,
    userSignup,
    userSignupPost,
    userLogin,
    userLoginPost,
    userLogout,
    chinese,
    spicy,
    noodles,
    userProfile,
    editProfile,
    editProfilePost
}