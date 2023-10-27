const { Router } = require("express");
const { check } = require("express-validator");
const {validarJWt, ValidarCampos, adminRole} = require('../middlewares');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");


const router = Router();
// Obtener todos los productos - publico
router.get("/", obtenerProductos);

//Crear categoria - privada - cualquier persona con un token valido
router.post("/",[
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    ValidarCampos
], crearProducto);

// Obtener un producto por id - publico
router.get("/:id",[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    ValidarCampos
  ], obtenerProducto);

  // Actualizar - privado - cualquiera con token valido
router.put("/:id",[
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    ValidarCampos
  ], actualizarProducto);

// Borrar una categoria - Admin
router.delete("/:id",[
    validarJWt,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    ValidarCampos
], borrarProducto);



module.exports = router;