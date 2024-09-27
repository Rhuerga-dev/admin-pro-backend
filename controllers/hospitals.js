
const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name');

    res.json({
        ok: true,
        hospitals
    });
}

const createHospital = async (req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({user: uid, ...req.body});

    try {


        //Guardar hospital
        const hospitalDB = await hospital.save();


        res.json({
            ok: true,
            hospital: hospitalDB

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        })
    }
}

const updateHospital = async (req, res = response) => {


    const uid = req.params.id;


    try {

        // Actualizacion
        const  name = req.body;

        //console.log(req.body);

        const hospitalDB = await Hospital.findById(uid);


        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(uid, name, { new: true });

        return res.json({
            ok: true,
            hospital: updatedHospital
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteHospital = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const hospitalDB = await Hospital.findById(uid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        await Hospital.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminstrador'
        });

    }
}



module.exports = { getHospitals, createHospital, updateHospital, deleteHospital }