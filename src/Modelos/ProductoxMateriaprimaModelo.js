//#region METODO LISTAR
const connection = require('../conexion');

var ProductoxMateriaprimaModelo = {};

ProductoxMateriaprimaModelo.getProductoxMateriaprimas = function(callback)
{
    if(connection)
    {
    var sql = "SELECT F. `ID_PROD_X_MAT`,    MP. `NOM_MATERIA_PRIMA`,    P. `NOM_PRODUCTO`    FROM `productoxmateriaprima` AS F   	INNER JOIN `materia_prima` AS MP ON F. `ID_MATERIA_PRIMA` = MP. `ID_MATERIA_PRIMA`"+
    " INNER JOIN `producto` AS P ON F. `ID_PRODUCTO` = P. `ID_PRODUCTO` ORDER BY `ID_PROD_X_MAT`";

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

module.exports =ProductoxMateriaprimaModelo;
//#endregion
//#region METODO INSERTAR
ProductoxMateriaprimaModelo.insertProductoxMateriaprima = function (ProdXMPData, callback) {
    if (connection) {
        var sql = " INSERT INTO productoxmateriaprima SET ?";

        connection.query(sql, ProdXMPData, function (error, result) {
            console.log(" 44 productoxmateriaprima "+ProdXMPData.ID_MATERIA_PRIMA+" ini "
            +ProdXMPData.ID_PRODUCTO
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
ProductoxMateriaprimaModelo.updateProductoxMateriaprima = function(ProdXMPData, callback){
    if(connection){
        var sql = "UPDATE productoxmateriaprima SET ID_MATERIA_PRIMA = "+
        connection.escape(ProdXMPData.ID_MATERIA_PRIMA)
        +", ID_PRODUCTO = "+
        connection.escape(ProdXMPData.ID_PRODUCTO)
        +" WHERE ID_PROD_X_MAT = "+
        connection.escape(ProdXMPData.ID_PROD_X_MAT)+";";
        
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
ProductoxMateriaprimaModelo.getProductoxMateriaprimasid = function(id, callback)
{
    if(connection)
    {
    
        var sql = "SELECT "+
        " F. `ID_PROD_X_MAT`,"+
        " MP. `NOM_MATERIA_PRIMA`,   "+
        " P. `NOM_PRODUCTO`  "+
        " FROM `productoxmateriaprima` AS F  "+
        " INNER JOIN `materia_prima` AS MP ON F. `ID_MATERIA_PRIMA` = MP. `ID_MATERIA_PRIMA`"+
        " INNER JOIN `producto` AS P ON F. `ID_PRODUCTO` = P. `ID_PRODUCTO` "+
        " WHERE F. `ID_PROD_X_MAT` = "+ connection.escape(id)+
        " ORDER BY `ID_PROD_X_MAT`;";

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
