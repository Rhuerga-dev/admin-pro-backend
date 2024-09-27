/*
    Path: /api/users
*/

const { Router } = require('express');

const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/', validateJWT, getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateField,
], createUser);

router.put('/:id',  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validateField
], updateUser);

router.delete('/:id', validateJWT, deleteUser);



module.exports = router;