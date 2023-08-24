const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWt = (req = request, res = response, next) =>{

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const {iud} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.iud = iud;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }
   


}


module.exports={
    validarJWt
}