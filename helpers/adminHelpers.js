var db = require('../config/connection')
var collection = require('../config/collection')
const { ObjectId } = require('mongodb')
const { response } = require('../app')
const bcrypt = require('bcrypt');



module.exports = {
    addProduct:(product) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(product).then((response) => {
                resolve(response)
            })
        })
    },

    getAllProduct:() => {
        return new Promise((resolve, reject) => {
            let products = db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },

    deleteProduct:(proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(proId)}).then((response) => {
                resolve(response)
            })
        })
    },

    getProduct:(productId) => {
        return new Promise((resolve, reject) => {
           let oneProduct = db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(productId)})
           resolve(oneProduct)
        })
    },

    addCategory:(category) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.CATEGORY_COLLECTION).insertOne(category).then((response) => {
                resolve(response)
            })
        })
    },
    getAllCategory:() => {
        return new Promise((resolve, reject) => {
            let category = db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
            resolve(category)
        })
    },
    getAllUsers:() => {
        return new Promise(async(resolve, reject) =>{
           let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
           console.log(users,'bbbbbbbbbbbbbbbbbbbbbbbbbb');
           resolve(users)
        })
    },


    changeStatus : (userId) =>{
        return new Promise((resolve , reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({_id : ObjectId(userId)} , {$set : {isAdmin : false}}).then((response) =>{
                resolve(response)
            })
        })
    },


    updateStatus : (userId) => {
        return new Promise((resolve , reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({_id : ObjectId(userId)} , {$set : {isAdmin : true}}).then((response) =>{
                resolve(response)
            })
        })
    },


    doLogin : (loginData) => {

        return new Promise(async (resolve , reject) => {
            let response = {}

            let admin = await db.get().collection(collection.USER_COLLECTION).findOne({email : loginData.email})

            if(admin){
                bcrypt.compare(loginData.password, admin.password).then((status) => {
                    console.log(status , "gggggggggggggggggggggg");
                    if(status){
                        response.admin = admin
                        response.status = true
                        resolve(response)
                    }
                    else{
                        reject({ status: false })
                    }
                })
            }
            else{
                reject({ status: false })
            }
        })
    }
}