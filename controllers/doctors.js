
const { response } = require('express');

const Doctor = require('../models/doctor');


const getDoctors = async (req, res = response) => {

    const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');

    res.json({
        ok: true,
        doctors
    });
}

const createDoctor = async (req, res = response) => {

    const uid = req.uid;
    const hospitalId = req.hospital;

    const doctor = new Doctor({ user: uid, hospital: hospitalId, ...req.body });

    try {

        //Guardar hospital
        const doctorDB = await doctor.save();


        res.json({
            ok: true,
            doctor: doctorDB

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        })
    }
}

const updateDoctor = async (req, res = response) => {


    const uid = req.params.id;


    try {

        // Actualizacion
        const name = req.body;

        const doctorDB = await Doctor.findById(uid);


        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor con ese id'
            });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(uid, name, { new: true });


        return res.json({
            ok: true,
            doctor: updatedDoctor
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteDoctor = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const doctorDB = await Doctor.findById(uid);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor con ese id'
            });
        }

        await Doctor.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Doctor Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminstrador'
        });

    }
}



module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor }