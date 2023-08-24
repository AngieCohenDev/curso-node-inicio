const { response, request, query } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const userGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] =await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  });
};

const userPost = async (req = request, res = response) => {
  const { nombre, mail, password, rol } = req.body;
  const usuario = new Usuario({ nombre, mail, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "put API - controlador",
    usuario,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const userDelete = async(req, res = response) => {

  const {id} = req.params;

  const uid = req.uid;

  //Borrar Fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  //Cambiar Estado otro metodo para borrar

  const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});


  res.json({
    usuario,
    uid
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
};
