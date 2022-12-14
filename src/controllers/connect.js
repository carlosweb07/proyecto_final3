require('dotenv').config()

module.exports = function(){
    
    this.conn = function(){

        const mysql = require('mysql')
        const conn  = mysql.createConnection({
    
            host:     process.env.HOST,
            user:     process.env.USER,
            password: process.env.PASS,
            database: process.env.DB
            
        })
            
        return conn
    }
}
