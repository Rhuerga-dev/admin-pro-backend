/*
    Path: /api/hospitals
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field')


const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/', getHospitals);

router.post('/', validateJWT, [
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    validateField
], createHospital);

router.put('/:id',validateJWT, [
    check('name', 'El nombre del hospital es obligatorio'),
    check('user', 'El nombre del usuario es obligatorio'),
    validateField,
], updateHospital);

router.delete('/:id', deleteHospital);



module.exports = router;