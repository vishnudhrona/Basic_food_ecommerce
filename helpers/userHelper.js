var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');
var objectId = require('mongodb').ObjectId
const { chinese, spicy } = require('../controllers/userController');


module.exports = {
    doSignup:(userData)=>{
        userData.signupstatus=false;
        userData.isAdmin = false
        return new Promise (async(resolve, reject)=>{
            try{
                userData.password =await  bcrypt.hash(userData.password,10)
                db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                    console.log(data,'xsssssssssssssssssssss');
                    resolve(data.insertedId)
                    
                })
            }catch(err){
                let error = {}
                error.message = 'Something went wrong'
                reject(error)
            }
        })
    },
    
    userLoginPost:(loginDetails) => {
        return new Promise(async(resolve, reject) => {
                let response = {}
              let user = await db.get().collection(collection.USER_COLLECTION).findOne({email : loginDetails.email})
              if(user){
                bcrypt.compare(loginDetails.password, user.password).then((status) => {
                    if(status){
                        response.user = user
                        response.status = true
                        resolve(response)
                    }
                })
              }else{
                resolve({ status : false})
              }
        })
    },
    filterCategory:(category) => {
        return new Promise(async(resolve, reject) => {
           let filter = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({category:category.category})
           resolve(filter)
        })
    },


    getChinese : (chinese) => {
        return new Promise(async (resolve , reject) => {
            let categoryChin = await db.get().collection(collection.PRODUCT_COLLECTION).find({category : chinese.category}).toArray()
            resolve(categoryChin)
        })
    },

    getSpicy : (spicy) => {
        return new Promise(async (resolve , reject) => {
            let categoryspicy = await db.get().collection(collection.PRODUCT_COLLECTION).find({category : spicy.category}).toArray()
            resolve(categoryspicy)
        })
    },

    getNoodles : (noodles) => {
        return new Promise(async (resolve , reject) => {
            let categoryNoodles = await db.get().collection(collection.PRODUCT_COLLECTION).find({category : noodles.category}).toArray()
            resolve(categoryNoodles)
        })
    },

    updateProfile : (profileBody, profileId) => {
        console.log(profileBody,'aaaaaaaaaaaaaaaaaaaaa');
        console.log(profileId,'bbbbbbbbbbbbbbbbbbbbbbbbb');
        return new Promise(async(resolve, reject) => {
           let modUser = await db.get().collection(collection.USER_COLLECTION).updateOne({_id : objectId(profileId)},{
                $set : {
                    name : profileBody.name,
                    number : profileBody.number,
                    email : profileBody.email
                }
            })
            resolve(modUser)
            console.log(modUser,'ggggggggggggggggg');
        })
    },
    getOneUsers : (profileId) => {
        return new Promise(async(resolve, reject) => {
            let updateUser = await db.get().collection(collection.USER_COLLECTION).findOne({_id : objectId(profileId)})
            console.log(updateUser,'ddddddddddddddddd');
        resolve(updateUser)
        })
        
    }
}