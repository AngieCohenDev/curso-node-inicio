const { Router } = require("express");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user");
const { check } = require("express-validator");

const router = Router();


router.get("/", userGet);

router.put("/:id", userPut);

router.post("/", [
  check('mail', 'El correo no es valido').isEmail(),
], userPost);

router.patch("/", userPatch);

router.delete("/", userDelete);

module.exports = router;
