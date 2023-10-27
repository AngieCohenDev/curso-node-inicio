const validarArchivoSubir = require("../middlewares/validar-archivo")
const  ValidarCampos  = require("../middlewares/validar_campos");
const  validarJWt  = require("../middlewares/validar-jwt");
const tieneRole = require("../middlewares/validar-roles");


module.exports ={
    ...ValidarCampos,
    ...validarJWt,
    ...tieneRole,
    ...validarArchivoSubir
}