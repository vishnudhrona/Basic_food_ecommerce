var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController')
var multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/productImage");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  const uploadMultiple = multer({ storage: multerStorage }).fields([{ name: 'image1', maxCount: 1 },
   { name: 'image2', maxCount: 1 }])

  //uploads banner img
//   const multerStorageBanner = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/banner-images");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   })
//   // const uploadBanner = multer({ storage: multerStorageBanner });

  const uploadSingleFile = multer({ storage: multerStorage })

/* GET users listing. */
router.get('/adminhome',adminController.adminHome)

/*admin Login section*/
router.get('/', adminController.adminLogin)

router.post('/',adminController.adminLoginPost)
/*End admin Login section*/

/*product management section*/
router.get('/productmanagement',adminController.productManagement)

router.post('/addproduct',uploadMultiple,adminController.addProduct)

router.get('/deleteproduct',adminController.deleteProduct)

router.get('/editproduct',adminController.editProduct)
/*End product management section*/

/* categoryManagement section*/
router.get('/categorymanagement',adminController.categoryManagement)

router.post('/addcategory',adminController.addCategory)
/*End CategoryManagement section*/

/*UserManagement section*/
router.get('/usermanagement',adminController.userManagement)

router.get('/adminFalse' ,adminController.adminFalse)

router.get('/adminTrue' , adminController.adminTrue)

router.get('/logout',adminController.logOut)







module.exports = router;
