/*
    Path: /api/doctors
*/


const { Router } = require('express');


const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const router = Router();


router.get('/', getDoctors);

router.post('/', validateJWT, [
    check('name', 'El nombre del doctor es obligatorio'),
    check('hospital', 'El id del hospital no es valido').isMongoId(),
    validateField
], createDoctor);

router.put('/:id', validateJWT, [
    check('name', 'El nombre del Doctor es obligatorio')
],  updateDoctor);

router.delete('/:id', validateJWT, deleteDoctor);



module.exports = router;