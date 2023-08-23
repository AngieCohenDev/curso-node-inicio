const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { ValidarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[

    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ValidarCampos

],login);


module.exports = router;