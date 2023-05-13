//#region METODO LISTAR
const connection = require('../conexion');

var ProduccionModelo = {};

ProduccionModelo.getProduccions = function(callback)
{
    if(connection)
    {
    var sql = "SELECT "+
    " P. `ID_PRODUCCION`, " +
    " P. `CALIDAD`, "+
    " P. `FEC_PRODUCCION`,"+
    " P. `CANTIDAD_PRODUCCION`,"+
    " P. `DEFECTUOSOS`,"+
    " CONCAT( A.`PNOM_PERSONAL`,' ',"+
    " A. `SNOM_PERSONAL`,' ',"+
    " A. `PAPELL_PERSONAL`,' ',"+
    " A. `SAPELL_PERSONAL`)'PERSONAL',"+
    " B. `NOM_PRODUCTO`"+
    " FROM `produccion` AS P "+
    " INNER JOIN `personal` AS A ON P. `ID_PERSONAL` = A. `ID_PERSONAL`"+
    " INNER JOIN `producto` AS B ON P. `ID_PRODUCTO` = B. `ID_PRODUCTO`"+
    " ORDER BY `ID_PRODUCCION`";

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
module.exports = ProduccionModelo;
//#endregion
//#region METODO INSERTAR

ProduccionModelo.insertproduccion = function (ProduccionData, callback) {
    if (connection) {
        var sql = " INSERT INTO produccion SET ?";

        connection.query(sql, ProduccionData, function (error, result) {
            console.log(" 44 Produccion "+ProduccionData.ID_PRODUCCION+" ini "
            +"ini"+ProduccionData.CALIDAD+"ini"+ProduccionData.FEC_PRODUCCION+"ini"+
            ProduccionData.CANTIDAD_PRODUCCION+"ini"+ProduccionData.DEFECTUOSOS+"ini"+
            ProduccionData.ID_PERSONAL+"ini"+ProduccionData.ID_PRODUCTO
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
ProduccionModelo.updateProduccion = function(ProduccionData, callback){
    if(connection){
        var sql = "UPDATE produccion SET CALIDAD = "+
        connection.escape(ProduccionData.CALIDAD)
        +", FEC_PRODUCCION = "+
        connection.escape(ProduccionData.FEC_PRODUCCION)
        +", CANTIDAD_PRODUCCION = "+
        connection.escape(ProduccionData.CANTIDAD_PRODUCCION)
        +", DEFECTUOSOS = "+ 
        connection.escape(ProduccionData.DEFECTUOSOS)
        +", ID_PERSONAL = "+
        connection.escape(ProduccionData.ID_PERSONAL)
        +", ID_PRODUCTO = "+
        connection.escape(ProduccionData.ID_PRODUCTO)
        +" WHERE ID_PRODUCCION = "+
        connection.escape(ProduccionData.ID_PRODUCCION)+";";
        
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
ProduccionModelo.getProduccionsid = function(id, callback)
{
    if(connection)
    {
    
        var sql = "SELECT "+
        " P. `ID_PRODUCCION`, " +
        " P. `CALIDAD`, "+
        " P. `FEC_PRODUCCION`,"+
        " P. `CANTIDAD_PRODUCCION`,"+
        " P. `DEFECTUOSOS`,"+
        " CONCAT( A.`PNOM_PERSONAL`,' ',"+
        " A. `SNOM_PERSONAL`,' ',"+
        " A. `PAPELL_PERSONAL`,' ',"+
        " A. `SAPELL_PERSONAL`)'PERSONAL',"+
        " B. `NOM_PRODUCTO`"+
        " FROM `produccion` AS P "+
        " INNER JOIN `personal` AS A ON P. `ID_PERSONAL` = A. `ID_PERSONAL`"+
        " INNER JOIN `producto` AS B ON P. `ID_PRODUCTO` = B. `ID_PRODUCTO`"+
        " WHERE `ID_PRODUCCION` = "+
         connection.escape(id)+
        "ORDER BY `ID_PRODUCCION`"
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
//#region METODO PARA LLAMAR INFORME
ProduccionModelo.getPrimInfoId = function(IdPrimerInforme, FecIni, FecFin, callback)
{
    if(connection)
    {
        var sql = "SELECT PD.ID_PRODUCCION, "+
        " PD.CALIDAD,"+
        " DATE_FORMAT(PD.FEC_PRODUCCION, '%d/%m/%Y') FEC_PRODUCCION,"+
        " PD.CANTIDAD_PRODUCCION,"+
        " (PD.CANTIDAD_PRODUCCION - PD.DEFECTUOSOS) CANT_PROD_BUENA,"+
        " CONCAT(PER.PNOM_PERSONAL, ' ', PER.SNOM_PERSONAL, ' ', PER.PAPELL_PERSONAL, ' ', PER.SAPELL_PERSONAL) NOM_PERSONAL,"+
        " PRO.NOM_PRODUCTO NOM_PRODUCTO"+
        " FROM PRODUCCION PD"+
        " INNER JOIN PERSONAL PER"+
        " USING (ID_PERSONAL)"+
        " INNER JOIN PRODUCTO PRO"+
        " USING (ID_PRODUCTO)"+
        " WHERE PD.CALIDAD = "+
        connection.escape(IdPrimerInforme)+
        " AND PD.FEC_PRODUCCION BETWEEN "+ connection.escape(FecIni) + " AND " + connection.escape(FecFin)+
        "ORDER BY ID_PRODUCCION;";

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