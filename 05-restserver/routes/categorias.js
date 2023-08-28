const { Router } = require("express");
const { check } = require("express-validator");
const {validarJWt, ValidarCampos} = require('../middlewares');
const { crearCategoria, obtenerCategorias, borrarCategoria } = require("../controllers/categorias");
const { existecategoriaPorId } = require("../helpers/db-categorias");


const router = Router();
// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener todas una categoria por id - publico
router.get("/:id",[
    //check('id').custom(existeCategoria)
], (req, res) => {
  res.json("get");
});

// Crear categoria - privada - cualquier persona con un token valido
router.post("/",[
    validarJWt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    ValidarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar una categoria - Admin
router.delete("/:id",[
    validarJWt,
    //tieneRole('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existecategoriaPorId),
    ValidarCampos
], borrarCategoria);

module.exports = router;
