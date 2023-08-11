const { Router } = require("express");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user");
const { check } = require("express-validator");
const { ValidarCampos } = require("../middlewares/validar_campos");
const Role = require("../models/role");

const router = Router();

router.get("/", userGet);

router.put("/:id", userPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("mail", "El correo no es valido").isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE' ]),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
      }
    }),
    ValidarCampos,
  ],
  userPost
);

router.patch("/", userPatch);

router.delete("/", userDelete);



module.exports = router;
