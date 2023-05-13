//#region METODO LISTAR
const connection = require('../conexion');

var ContactoModelo = {};

ContactoModelo.getContactos = function(callback)
{
    if(connection)
    {
    var sql = "SELECT C.`ID_CONTACTO`, CONCAT(P.`PNOM_PERSONAL`,' ', P.`SNOM_PERSONAL`,' ', P.`PAPELL_PERSONAL`,' ', P.`SAPELL_PERSONAL`) AS 'NOMBRE PERSONAL', C.`DIRDATO_CONTACTO`, CA. `CATALOGO` AS 'TIPO_CONTACTO' FROM `contacto` AS C INNER JOIN `personal` AS P ON C.`ID_PERSONAL` = P. `ID_PERSONAL` INNER JOIN `catalogo` AS CA ON C. `TIPO_CONTACTO`= CA. `ID_CATALOGO` ORDER BY `ID_CONTACTO`";

    connection.query(sql, function(error, rows)
    {
        if(error)
        {
            throw error;
        }
            else
        {
            callback(null, rows);
        }
    });
}
}

module.exports = ContactoModelo;
//#endregion
//#region METODO INSERTAR
ContactoModelo.insertContacto = function (contactoData, callback) {
    if (connection) {
        var sql = " INSERT INTO contacto SET ?";

        connection.query(sql, contactoData, function (error, result) {
            console.log(" 44 contacto "+contactoData.ID_PERSONAL+" ini "
            +"ini"+contactoData.DIRDATO_CONTACTO+"ini"+contactoData.TIPO_CONTACTO
); 
            
            if (error) {
                throw error;

            } else {
                callback(null, { "msg": "Registro insertado" });
            }
        });
    }
};
//#endregion
//#region METODO MODIFICAR
ContactoModelo.updateContacto = function(ContactoData, callback){
    if(connection){
        var sql = "UPDATE contacto SET ID_PERSONAL = "+
        connection.escape(ContactoData.ID_PERSONAL)
        +", DIRDATO_CONTACTO = "+
        connection.escape(ContactoData.DIRDATO_CONTACTO)
        +", TIPO_CONTACTO = "+
        connection.escape(ContactoData.TIPO_CONTACTO)
        +" WHERE ID_CONTACTO = "+
        connection.escape(ContactoData.ID_CONTACTO)+";";
        
        connection.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg:": "Registro Actualizado"});
            }
        });
    }
}
//#endregion
//#region METODO CONSULTA ID
ContactoModelo.getContactosid = function(id, callback)
{
    if(connection)
    {
    
        var sql = "SELECT C.`ID_CONTACTO`, CONCAT(P.`PNOM_PERSONAL`,' ', P.`SNOM_PERSONAL`,' ', P.`PAPELL_PERSONAL`,' ', P.`SAPELL_PERSONAL`) AS 'NOMBRE PERSONAL', C.`DIRDATO_CONTACTO`, CA. `CATALOGO` AS 'TIPO_CONTACTO' FROM `contacto` AS C INNER JOIN `personal` AS P ON C.`ID_PERSONAL` = P. `ID_PERSONAL` INNER JOIN `catalogo` AS CA ON C. `TIPO_CONTACTO`= CA. `ID_CATALOGO` WHERE `ID_CONTACTO` = " + connection.escape(id)+"ORDER BY `ID_CONTACTO`"+
         ";";

        connection.query(sql, function(error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};
//#endregion