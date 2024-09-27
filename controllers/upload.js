const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/updateImage');


const uploadFile = ( req, res = response ) => {

    const type = req.params.type;
    const id   = req.params.id;

    // Validar tipo
    const validType = ['hospitals','doctors','users'];
    if ( !validType.includes(type) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un doctors, users u hospitals ' + type
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.image;

    const splitName = file.name.split('.'); // wolverine.1.3.jpg
    const fileExt = splitName[ splitName.length - 1 ];
    
    // Validar extension
    const validExt = ['png','jpg','jpeg','gif'];
    if ( !validExt.includes( fileExt ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const fileName = `${ uuidv4() }.${ fileExt }`;

    // Path para guardar la imagen
    const path = `./uploads/${ type }/${ fileName }`;

    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        updateImage( type, id, fileName );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName
        });
    });

}


const ImageBack = ( req, res = response ) => {

    const type = req.params.type;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ type }/${ photo }` );

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    uploadFile,
    ImageBack
}