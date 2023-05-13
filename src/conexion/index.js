var mysql = require('mysql');
var settings = require('./config.json');
var connection;

function connectDatabase()
{
    if(!connection)
    {
        connection = mysql.createConnection(settings);

        connection.connect(function(err)
        {
            if(!err)
            {
                console.log('base de datos conectada' +settings.database);
            }
            else
            {
                console.log('Error en la conexion con la base de datos');
            }
        });
    }
    return connection;
}
module.exports = connectDatabase();