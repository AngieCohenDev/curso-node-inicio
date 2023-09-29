const { response, request } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: "No hay archivo para subir",
    });
    return;
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    
  } catch (msg) {
    res.status(400).json({msg});
    
  }
  
};

const actualizarImagen = async (req, res = response) => {
  const {id, coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
