
const { response } = require('express');
const bcrypt = require('bcryptjs');


const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name role email google');

    res.json({
        ok: true,
        users,
    });
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existEmail = await User.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }


        const user = new User(req.body);




        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardar ususario
        await user.save();

        // Generar un TOKEN -JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

const updateUser = async (req, res = response) => {

    // TODO: Validar token y comprovar si es el usuario correcto

    const uid = req.params.id;


    try {

        const userDB = await User.findById(uid);


        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }


        // Actualizacion
        const { password, google, email, ...fields } = req.body;

        if (userDB.email != req.body.email) {

            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una cuenta con ese email'
                });
            }
        }

        fields.email = email;


        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });


        return res.json({
            ok: true,
            user: updatedUser
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const deleteUser = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminstrador'
        });

    }
}



module.exports = { getUsers, createUser, updateUser, deleteUser }