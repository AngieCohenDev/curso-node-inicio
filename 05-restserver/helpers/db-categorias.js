const Categoria = require('../models/categoria')

const existecategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
      throw new Error(` El id:${id} no existe` );
    }
  };


  module.exports = {
    existecategoriaPorId
  }