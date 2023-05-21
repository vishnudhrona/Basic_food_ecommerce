var express = require('express');
var router = express.Router();
var adminHelpers = require('../helpers/adminHelpers');
const { response } = require('../app');

const credential = {
    email: 'vishnuvaliyaveetil92@gmail.com',
    password: '1234'
}

let adminHome = (req, res) => {
    res.render('admin/adminHome')
}

/*admin login section*/
let adminLogin = (req,res) => {
    res.render('admin/adminLogin')
}

let adminLoginPost = (req, res) => {
    adminHelpers.doLogin(req.body).then(async (response) => {
        console.log(response , "tttttttttttttttttttt");
            if(response.status){
                if(response.admin.isAdmin){
                    let admin = response
                    res.render('admin/adminhome')
                }else{
                    res.render('admin/adminLogin' , { error: 'you are not admin' })
                }
            }
        })
        .catch(() => {
            res.render('/admin', { error: 'invalid username or password' })
        })
}
/*End admin login section*/

/*product management section*/
let productManagement = (req, res) => {
    adminHelpers.getAllProduct().then(async (products) => {
        let category = await adminHelpers.getAllCategory()
        console.log(category,'vvvvvvvvvvvvvvvvv');
        res.render('admin/productManagement',{ products, category })
    })
    
}

let addProduct = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.image1 = req.files.image1[0].filename
    req.body.image2 = req.files.image2[0].filename
    adminHelpers.addProduct(req.body)
        res.redirect('/admin/productmanagement')
    
}

let deleteProduct = (req, res) => {
    adminHelpers.deleteProduct(req.query.id).then((response) => {
        res.redirect('/admin/productmanagement')
    })
}

let editProduct = (req, res) => {
    adminHelpers.getProduct(req.query.id).then((oneProduct) => {
        res.render('admin/editProduct',{oneProduct})
    })
}
/*End product management section*/

let categoryManagement = async(req, res) => {
    let category = await adminHelpers.getAllCategory()
        res.render('admin/categoryManagement',{category})
}

let addCategory = (req, res) => {
    adminHelpers.addCategory(req.body).then((response) => {
        res.redirect('/admin/categorymanagement')
    })
}

/*userManagement section*/
let userManagement = (req, res) => {
    adminHelpers.getAllUsers().then((users) => {
        console.log(users , "qqqqqqqqqqqqqqqqqqqqq");
        res.render('admin/userManagement',{users})
    })
}
/*End userManagement section*/


let adminFalse = (req ,res) => {
    let userId = req.query.id
    adminHelpers.changeStatus(userId).then((response) => {
        res.redirect('/admin/usermanagement')
    })
}

let adminTrue = (req , res) => {
    let userId = req.query.id
    adminHelpers.updateStatus(userId).then((response) => {
        res.redirect('/admin/usermanagement')
    })
}

let logOut = (req, res) => {
    res.redirect('/admin')
}

module.exports = {
    adminLogin,
    adminHome,
    adminLoginPost,
    productManagement,
    addProduct,
    deleteProduct,
    editProduct,
    categoryManagement,
    addCategory,
    userManagement,
    adminFalse,
    adminTrue,
    logOut
}