//#region METODO LISTAR
const connection = require('../conexion');

var PersonalModelo = {};

PersonalModelo.getPersonals = function(callback)
{
    if(connection)
    {
    var sql = " SELECT p.`ID_PERSONAL`, CONCAT(p.`PNOM_PERSONAL`, ' '"+
    " , p.`SNOM_PERSONAL`, ' ', p.`PAPELL_PERSONAL`, ' ', p.`SAPELL_PERSONAL`)"+
    " AS 'PERSONA', c.`CATALOGO` AS 'TIPO_DOC', p.`NUM_DOC`, d.`CATALOGO` AS 'CARGO_PERSONA' "+
    "FROM `personal` AS p INNER JOIN `catalogo`AS c ON p.`TIPO_DOC`= c.`ID_CATALOGO` "+
    "INNER JOIN `catalogo`AS d ON p.`CARGO_PERSONA`= d.`ID_CATALOGO` ORDER BY `ID_PERSONAL`";

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
module.exports = PersonalModelo;
//#endregion
//#region METODO INSERTAR
PersonalModelo.insertPersonal = function (personalData, callback) {
    if (connection) {
        var sql = " INSERT INTO personal SET ?";

        connection.query(sql, personalData, function (error, result) {
            console.log(" 55 personal "+personalData.PNOM_PERSONAL+" ini "
            +personalData.SNOM_PERSONAL+"ini"+personalData.PAPELL_PERSONAL+"ini"
            +personalData.SAPELL_PERSONAL+"ini"+personalData.TIPO_DOC+"ini"
            +personalData.NUM_DOC+"ini"+personalData.CARGO_PERSONA); 

            
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
PersonalModelo.updatePersonal = function(PersonalData, callback){
    if(connection){
        var sql = "UPDATE personal SET PNOM_PERSONAL = "+
        connection.escape(PersonalData.PNOM_PERSONAL)
        +", SNOM_PERSONAL = "+
        connection.escape(PersonalData.SNOM_PERSONAL)
        +", PAPELL_PERSONAL = "+
        connection.escape(PersonalData.PAPELL_PERSONAL)
        +", SAPELL_PERSONAL = "+ 
        connection.escape(PersonalData.SAPELL_PERSONAL)
        +", TIPO_DOC = "+
        connection.escape(PersonalData.TIPO_DOC)
        +", NUM_DOC = "+
        connection.escape(PersonalData.NUM_DOC)
        +", CARGO_PERSONA = "+
        connection.escape(PersonalData.CARGO_PERSONA)
        +" WHERE ID_PERSONAL = "+
        connection.escape(PersonalData.ID_PERSONAL)+";";
        
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
PersonalModelo.getPersonalsid = function(id, callback)
{
    if(connection)
    {
    
        var sql = " SELECT p.`ID_PERSONAL`, CONCAT(p.`PNOM_PERSONAL`, ' '"+
        " , p.`SNOM_PERSONAL`, ' ', p.`PAPELL_PERSONAL`, ' ', p.`SAPELL_PERSONAL`)"+
        " AS 'PERSONA', c.`CATALOGO` AS 'TIPO_DOC', p.`NUM_DOC`, d.`CATALOGO` AS 'CARGO_PERSONA' "+
        " FROM `personal` AS p INNER JOIN `catalogo`AS c ON p.`TIPO_DOC`= c.`ID_CATALOGO` "+
        " INNER JOIN `catalogo`AS d ON p.`CARGO_PERSONA`= d.`ID_CATALOGO` WHERE p.`ID_PERSONAL`= "+ connection.escape(id)+ " ORDER BY p.`ID_PERSONAL`;";

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