const {response, request} = require('express');

const userGet = (req = request, res = response) => {

    const {q, nombre, apikey} = req.query;

    res.json({
      msg: "get API - controlador",
      q,
      nombre,
      apikey
    });
}

const userPost = (req = request, res = response) => {
    
    const {nombre, edad, color} = req.body;
    
    res.json({
      msg: "post API - controlador",
      nombre,
      edad,
      color
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