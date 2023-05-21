var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET home page. */
router.get('/', userController.userHome);

/* userSignUp Section */
router.get('/usersignup',userController.userSignup)
router.post('/usersignup',userController.userSignupPost)
/*End userSignup section*/

/*userLogin section*/
router.get('/userlogin', userController.userLogin)

router.post('/userlogin',userController.userLoginPost)

router.get('/userlogout',userController.userLogout)
/*End UserLogin section*/


router.post('/chinese' , userController.chinese)
router.post('/spicy' , userController.spicy)
router.post('/noodles' , userController.noodles)

/*userProfile Section*/
router.get('/userprofile',userController.userProfile)

router.get('/editprofile',userController.editProfile)

router.post('/editprofile',userController.editProfilePost)
/*End userProfile section*/

module.exports = router;
