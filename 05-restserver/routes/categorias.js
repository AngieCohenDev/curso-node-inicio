const { Router } = require("express");
const { check } = require("express-validator");
const {validarJWt, ValidarCampos, adminRole} = require('../middlewares');
const { crearCategoria, obtenerCategorias, borrarCategoria, obtenerCategoria, actualizarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");


const router = Router();
// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener todas una categoria por id - publico
router.get("/:id",[
  check('id', 'No es un id de Mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  ValidarCampos
], obtenerCategoria);

// Crear categoria - privada - cualquier persona con un token valido
router.post("/",[
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ValidarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con token valido
router.put("/:id",[
  validarJWt,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaPorId),
  ValidarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete("/:id",[
    validarJWt,
    //tieneRole('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    ValidarCampos
], borrarCategoria);

module.exports = router;
