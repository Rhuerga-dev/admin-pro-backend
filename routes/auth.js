
/*
    Path: /api/auth
*/

const { Router } = require('express');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    check( 'email', ' El email es obligatorio').isEmail(),
    check( 'password', ' El password es obligatorio').not().isEmpty(),
    validateField
], login);

router.post('/google', [
    check( 'token', ' El token de google es obligatorio').not().isEmpty(),
    validateField
], googleSingIn)

router.get('/renew',validateJWT, renewToken)

module.exports = router;