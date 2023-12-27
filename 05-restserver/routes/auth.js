const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignIn, renovarToken } = require('../controllers/auth');
const { ValidarCampos } = require('../middlewares/validar_campos');
const { validarJWt } = require('../middlewares/validar-jwt');

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

router.get('/', validarJWt, renovarToken);


module.exports = router;