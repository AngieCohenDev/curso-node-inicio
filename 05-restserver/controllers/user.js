const {response} = require('express');

const userGet = (req, res = response) => {
    res.json({
      msg: "get API - controlador",
    });
}

const userPost = (req, res = response) => {
    res.json({
      msg: "post API - controlador",
    });
}

const userPut = (req, res = response) => {
    res.json({
      msg: "put API - controlador",
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