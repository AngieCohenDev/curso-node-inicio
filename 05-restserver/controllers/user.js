const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const userGet = (req = request, res = response) => {

    const {q, nombre, apikey} = req.query;

    res.json({
      msg: "get API - controlador",
      q,
      nombre,
      apikey
    });
}

const userPost = async(req = request, res = response) => {

    const {nombre, mail, password, rol}= req.body;
    const usuario = new Usuario({nombre, mail, password, rol});

    // Verificar si el correo existe
    const existeMail = await Usuario.findOne({mail});
    if(existeMail){
      return res.status(400).json({
        msg: 'Este correo ya esta registrado'
      });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    // Guardar en BD
    await usuario.save();

    res.json({
      usuario
    });
}

const userPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
      msg: "put API - controlador",
      id
    });
}

const userPatch = (req, res = response) => {
    res.json({
      msg: "patch API - controlador",
    });
}

const userDelete = (req, res = response) => {
    res.json({
      msg: "delete API - controlador",
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}