const { Router } = require("express");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user");
const { check } = require("express-validator");

const { roleValido, ifMailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {ValidarCampos, validarJWt,tieneRole} = require('../middlewares')

const router = Router();

router.get("/", userGet);

router.put("/:id", [
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(roleValido),
  ValidarCampos
], userPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("mail", "El correo no es valido").isEmail().custom(ifMailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE' ]),
    check("rol").custom(roleValido),
    ValidarCampos,
  ],
  userPost
);

router.patch("/", userPatch);

router.delete("/:id", [
  validarJWt,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
  //adminRole,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  ValidarCampos
],userDelete);



module.exports = router;
