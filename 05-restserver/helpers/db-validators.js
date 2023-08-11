const Role = require("../models/role");
const Usuario = require("../models/usuario");

const roleValido = async (rol = " ") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const ifMailExiste = async (mail = " ") => {
  const existeMail = await Usuario.findOne({ mail });
  if (existeMail) {
    throw new Error(` el correo: ${mail}, se encuentra registrado`);
  }
};

module.exports = {
  roleValido,
  ifMailExiste,
};
