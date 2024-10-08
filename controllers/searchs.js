
const { response } = require('express');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');


const searchAll = async (req, res = response) => {

    const term = req.params.term;

    const regex = new RegExp(term, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img'),
        Hospital.find({ name: regex }).populate('user', 'name img'),

    ]);


    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    });
}

const searchCollection = async (req, res = response) => {

    const term = req.params.term;
    const table = req.params.table;

    const regex = new RegExp(term, 'i');

    let data = [];


    switch (table) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
                
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                    .populate('user', 'name img');
            break;
        case 'users':
            data = await User.find({ name: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })

    }
    res.json({
        ok: true,
        result: data
    })

}


module.exports = { searchAll, searchCollection }