const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total -populate
const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

// obtenerCategoria - populate{}

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

//actualizarcategoria

// borrarCategoria - estado: false

const borrarCategoria = async(req, res = response) =>{
    
    const {id} = req.params;

    categoria = await Categoria.findByIdAndUpdate(id, {estado : false});

    res.json({
        categoria
    })
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  borrarCategoria
};
