//#region METODO LISTAR
const connection = require('../conexion');

var Materia_PrimaModelo = {};

Materia_PrimaModelo.getMateria_Primas = function(callback)
{
    if(connection)
    {
    var sql = "SELECT "+
    " MP. `ID_MATERIA_PRIMA`, "+
    " MP. `NOM_MATERIA_PRIMA`, "+
    " MP. `CANTIDAD`, "+
    " B. `CATALOGO` AS 'TIPO_MP',"+
    " C. `CATALOGO` AS 'PRESENTACION_MP' "+
    " FROM `materia_prima` AS MP "+
    " INNER JOIN `catalogo` AS B ON MP. `TIPO_MP` = B. `ID_CATALOGO`"+
    " INNER JOIN `catalogo` AS C ON MP. `PRESENTACION_MP` = C. `ID_CATALOGO`"+
    " ORDER BY `ID_MATERIA_PRIMA`";

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

module.exports = Materia_PrimaModelo
//#endregion
//#region METODO INSERTAR
Materia_PrimaModelo.insertMateria_Prima = function (Materia_PrimaData, callback) {
    if (connection) {
        var sql = " INSERT INTO materia_prima SET ?";

            connection.query(sql, Materia_PrimaData, function (error, result) {
            /*console.log(" 44 materia_prima "+Materia_PrimaData.ID_MATERIA_PRIMA+" ini "
            +"ini"+Materia_PrimaData.NOM_MATERIA_PRIMA+"ini"+Materia_PrimaData.CANTIDAD+"ini"+
            Materia_PrimaData.TIPO_MP+"ini"+Materia_PrimaData.PRESENTACION_MP
);*/ 
            
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
Materia_PrimaModelo.updateMateriaprima = function(Materia_PrimaData,callback){
    if(connection){
        var sql = "UPDATE materia_prima SET NOM_MATERIA_PRIMA = "+  connection.escape(Materia_PrimaData.NOM_MATERIA_PRIMA)+
        ", CANTIDAD = "+ connection.escape(Materia_PrimaData.CANTIDAD)+
        ", TIPO_MP = "+  connection.escape(Materia_PrimaData.TIPO_MP)+
        ", PRESENTACION_MP = "+ connection.escape(Materia_PrimaData.PRESENTACION_MP)+
        " WHERE ID_MATERIA_PRIMA = " + connection.escape(Materia_PrimaData.ID_MATERIA_PRIMA)+";";

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
//#region METODO CONSULTA ID
Materia_PrimaModelo.getMateria_Primasid = function(id, callback)
{
    if(connection)
    {
    
        var sql = "SELECT "+
        " MP. `ID_MATERIA_PRIMA`, "+
        " MP. `NOM_MATERIA_PRIMA`, "+
        " MP. `CANTIDAD`, "+
        " B. `CATALOGO` AS 'TIPO_MP',"+
        " C. `CATALOGO` AS 'PRESENTACION_MP' "+
        " FROM `materia_prima` AS MP "+
        " INNER JOIN `catalogo` AS B ON MP. `TIPO_MP` = B. `ID_CATALOGO`"+
        " INNER JOIN `catalogo` AS C ON MP. `PRESENTACION_MP` = C. `ID_CATALOGO`"+
        " WHERE `ID_MATERIA_PRIMA` = "+
            connection.escape(id)+
        "ORDER BY `ID_MATERIA_PRIMA`";

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
