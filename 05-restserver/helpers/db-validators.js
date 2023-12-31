const { Usuario,Categoria, Role, Producto} = require("../models");


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

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(` El id:${id} no existe` );
  }
};

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
      throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }
    return true;
}

module.exports = {
  roleValido,
  ifMailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas
};
