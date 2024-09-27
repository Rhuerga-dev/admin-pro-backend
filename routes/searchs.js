/*
    Path: /api/search
*/

const { Router } = require('express');


const  { searchAll, searchCollection }  = require('../controllers/searchs');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/:term', validateJWT, searchAll);

router.get('/collection/:table/:term', validateJWT, searchCollection);

module.exports = router;