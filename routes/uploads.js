/*
    Path: /api/uploads/
*/
const express = require('express');

const { Router } = require('express');

const fileUpload = require('express-fileupload');



const  { uploadFile, ImageBack}  = require('../controllers/upload');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use(fileUpload());

router.put('/:type/:id', validateJWT, uploadFile);
router.get('/:type/:photo', ImageBack );


module.exports = router;