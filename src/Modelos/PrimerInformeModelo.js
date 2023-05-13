const connection = require('../conexion');

var PrimerInformeModelo = {};

//#region Metodo Consultar Primer Informe
PrimerInformeModelo.getPrimInfoId = function(id, callback)
{
    if(connection)
    {
        var sql = "SELECT PD.ID_PRODUCCION, "+
        " PD.CALIDAD,"+
        " PD.FEC_PRODUCCION,"+
        " PD.CANTIDAD_PRODUCCION,"+
        " (PD.CANTIDAD_PRODUCCION - PD.DEFECTUOSOS) CANT_PROD_BUENA,"+
        " CONCAT(PER.PNOM_PERSONAL, ' ', PER.SNOM_PERSONAL, ' ', PER.PAPELL_PERSONAL, ' ', PER.SAPELL_PERSONAL) NOM_PERSONAL,"+
        " PRO.NOM_PRODUCTO NOM_PRODUCTO"+
        " FROM PRODUCCION PD"+
        " INNER JOIN PERSONAL PER"+
        " USING (ID_PERSONAL)"+
        " INNER JOIN PRODUCTO PRO"+
        " USING (ID_PRODUCTO)"+
        " WHERE ID_PRODUCCION = "+
        connection.escape(id)+
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

module.exports = PrimerInformeModelo