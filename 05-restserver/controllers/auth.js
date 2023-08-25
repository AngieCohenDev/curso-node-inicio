const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWt } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    // verificar si el email existe
    const usuario = await Usuario.findOne({ mail });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    //si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado:false",
      });
    }

    //verificar password

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWt(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async(req, res = response) => {

  const {id_token} = req.body;

  res.json({
    msg:'Todo bien',
    id_token
  })
} 

module.exports = {
  login,
  googleSignIn
};
