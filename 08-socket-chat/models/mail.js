const {Schema, model} = require('mongoose');

const EmailSchema = new Schema({
    mail:{
        type: String,
        required: [true, 'El correo es obligatorio']
    }
})


module.exports = model('Mail', EmailSchema);