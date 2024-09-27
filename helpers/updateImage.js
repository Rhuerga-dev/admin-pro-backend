const User = require('../models/user');
const fs = require('fs');

const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const { use } = require('../routes/searchs');

const eraseIname = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const updateImage = async(type, id, fileName) => {

    let oldPath = '';
    
    switch( type ) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if ( !doctor ) {
                console.log('No es un médico por id');
                return false;
            }

            oldPath = `./uploads/doctor/${ doctor.img }`;
            eraseIname( oldPath );

            doctor.img = fileName;
            await doctor.save();
            return true;

        break;
        
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            oldPath = `./uploads/hospitales/${ hospital.img }`;
            eraseIname( oldPath );

            hospital.img = fileName;
            await hospital.save();
            return true;

        break;
        
        case 'users':

            const user = await User.findById(id);
            if ( !user ) {
                console.log('No es un usuario por id');
                return false;
            }

            oldPath = `./uploads/hospitales/${ user.img }`;
            eraseIname( oldPath );

            user.img = fileName;
            await user.save();
            return true;

        break;
    }


}



module.exports = { 
    updateImage
}
