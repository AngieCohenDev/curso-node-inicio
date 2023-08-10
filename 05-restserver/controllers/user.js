const {response, request} = require('express');
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
    
    const body= req.body;
    const usuario = new Usuario(body);
    
    await usuario.save();

    res.json({
      msg: "post API - controlador",
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