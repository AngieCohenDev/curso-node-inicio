const { Usuario,Categoria, Role} = require("../models");


const roleValido = async (rol = " ") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const ifMailExiste = async (mail = " ") => {
  const existeMail = await Usuario.findOne({ mail });
  if (existeMail) {
    throw new Error(` El correo: ${mail}, se encuentra registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(` El id:${id} no existe` );
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(` El id:${id} no existe` );
  }
};

module.exports = {
  roleValido,
  ifMailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId
};
