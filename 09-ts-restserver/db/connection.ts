import {Sequelize} from 'sequelize';


const db = new Sequelize('node', 'root', {
   
    dialect:'mysql',
    host:'localhost',
   
    //logging: false,
})

export default db;