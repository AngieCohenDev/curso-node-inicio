const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { ValidarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[

    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ValidarCampos

],login);

router.post('/google',[

    check('id_token', 'id_token es requerido').not().isEmpty(),
    ValidarCampos

],googleSignIn);


module.exports = router;