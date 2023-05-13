//#region METODO LISTAR
const connection = require('../conexion');

var CatalogoModelo = {};

CatalogoModelo.getCatalogos = function(callback)
{
    if(connection)
    {
    
    var sql = "SELECT C.`ID_CATALOGO`,"+
    " C.`CATALOGO`,  N.`CATALOGO` AS 'TIPO_CATALOGO' "+
    "FROM `catalogo` AS C 	INNER JOIN `catalogo` AS N ON C. "+
    "`TIPO_CATALOGO` = N. `ID_CATALOGO` ORDER BY`TIPO_CATALOGO`";

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
    module.exports = CatalogoModelo;
//#endregion
//#region METODO INSERTAR
CatalogoModelo.insertCatalogo = function (CatalogoData, callback) {
    if (connection) {
        var sql = " INSERT INTO catalogo SET ?";

        connection.query(sql, CatalogoData, function (error, result) {
            console.log(" 44 Catalogo "+CatalogoData.Catalogo+" ini "
            +CatalogoData.TIPO_CATALOGO);
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
CatalogoModelo.updateCatalogo = function(CatalogoData,callback){
    if(connection){
        var sql = "UPDATE catalogo SET CATALOGO = "+
        connection.escape(CatalogoData.CATALOGO)+
        ", TIPO_CATALOGO = "+
        connection.escape(CatalogoData.TIPO_CATALOGO)+
        " WHERE ID_CATALOGO = "+
        connection.escape(CatalogoData.ID_CATALOGO)+";";

        connection.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"MSG: ": "Registro Actualizado"});
            }
        });
    }
}
//#endregion
//#region METODO CONSULTA FORANEA
CatalogoModelo.getCatalogosTC = function(tipcat, callback)
{
    if(connection)
    {
    
        var sql = "SELECT C.`ID_CATALOGO`,"+
        " C.`CATALOGO`,  N.`CATALOGO` AS 'TIPO_CATALOGO' "+
        "   FROM `catalogo` AS C 	INNER JOIN `catalogo` AS N ON C. "+
        "`TIPO_CATALOGO` = N. `ID_CATALOGO` "+
        "WHERE C.`TIPO_CATALOGO` = "+
        connection.escape(tipcat)+
        " ORDER BY C. ID_CATALOGO ;";

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
//#region METODO CONSULTAR ID DENTRO FORANEA
CatalogoModelo.getCatalogosID = function(tipcat, id,  callback)
{

        console.log("  aca 33 " + tipcat + " -  " + id);
    if(connection)
    {
    
        var sql = "SELECT C.`ID_CATALOGO`,"+
        " C.`CATALOGO`,  N.`CATALOGO` AS 'TIPO_CATALOGO' "+
        " FROM `catalogo` AS C 	INNER JOIN `catalogo` AS N ON C. "+
        " `TIPO_CATALOGO` = N. `ID_CATALOGO` "+
        " WHERE C.`TIPO_CATALOGO` = " + connection.escape(tipcat)+
        " AND C.`ID_CATALOGO` = "+ connection.escape(id)+ ";";

        console.log("  aca 67 " + tipcat + " -  " + id);

        
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