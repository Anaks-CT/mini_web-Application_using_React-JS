const express = require("express");
const router = express.Router();

const adminAuth = require('../controller/admin/adminLoginAuth')
const userDetails = require('../controller/admin/userDetails')
const deleteuser = require('../controller/admin/deleteuser')
const editUser = require('../controller/admin/editUser')
const addUser = require('../controller/admin/addUser')

router.post('/login', adminAuth)
router.get('/userDetails', userDetails)
router.delete('/deleteuser/:id',deleteuser)
router.post('/edituser',editUser)
router.post('/addUser', addUser)

module.exports = router
