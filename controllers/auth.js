

const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    const { email, password } = req.body;


    try {

        // Verificar email
        const userDB = await User.findOne({ email });


        if (!userDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar un TOKEN -JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminstrador'
        });
    }
}

const googleSingIn = async (req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        const userDB = await User.findOne({ email });
        let user;

        if (!userDB) {
            user = new User({
                name: name,
                email: email,
                img: picture,
                google: true,
                password: '@@@',

            });

        } else {

            user = userDB;
            user.google = true
        }

        //Guardar usuario
        await user.save();

        // Generar el TOKEN - JWT
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            email, name, picture,
            token

        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        });
    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );


    res.json({
        ok: true,
        token

    });
}


module.exports = { login, googleSingIn, renewToken }