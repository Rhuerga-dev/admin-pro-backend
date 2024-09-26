
/*
    Path: /api/auth
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.post('/', [
    check( 'email', ' El email es obligatorio').isEmail(),
    check( 'password', ' El password es obligatorio').not().isEmpty(),
    validateField
], login)



module.exports = router;