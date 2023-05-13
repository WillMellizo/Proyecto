//#region METODO LISTAR
const connection = require('../conexion');

var ProductoModelo = {};

ProductoModelo.getProductos = function(callback)
{
    if(connection)
    {
    var sql = "SELECT	"+
    " P. `ID_PRODUCTO`, "+
    " P. `NOM_PRODUCTO`,"+
    " C. `CATALOGO` AS 'CATEGORIA_PRODUCTO',   "+
    " B. `CATALOGO` AS 'CLASE_PRODUCTO'  "+
    " FROM `producto` AS P "+
    " INNER JOIN `catalogo` AS C ON P. `CATEGORIA_PRODUCTO` =  C. `ID_CATALOGO`"+
    " INNER JOIN `catalogo` AS B ON P. `CLASE_PRODUCTO` =  B. `ID_CATALOGO` "+
    "ORDER BY `ID_PRODUCTO`";

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
module.exports = ProductoModelo
//#endregion
//#region METODO INSERTAR
ProductoModelo.insertproducto = function (ProductoData, callback) {
    if (connection) {
        var sql = " INSERT INTO producto SET ?";

        connection.query(sql, ProductoData, function (error, result) {
            console.log(" 44 Producto "+ProductoData.ID_PRODUCTO+" ini "
            +"ini"+ProductoData.NOM_PRODUCTO+"ini"+ProductoData.CATEGORIA_PRODUCTO+"ini"+
            ProductoData.CLASE_PRODUCTO
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
ProductoModelo.updateProducto = function(ProductoData, callback){
    if(connection){
        var sql = "UPDATE producto SET NOM_PRODUCTO = "+
        connection.escape(ProductoData.NOM_PRODUCTO)
        +", CATEGORIA_PRODUCTO = "+
        connection.escape(ProductoData.CATEGORIA_PRODUCTO)
        +", CLASE_PRODUCTO = "+
        connection.escape(ProductoData.CLASE_PRODUCTO)
        +" WHERE ID_PRODUCTO = "+
        connection.escape(ProductoData.ID_PRODUCTO)+";";
        
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
ProductoModelo.getProductosid = function(id, callback)
{
    if(connection)
    {
    
        var sql = "SELECT	"+
        " P. `ID_PRODUCTO`, "+
        " P. `NOM_PRODUCTO`,"+
        " C. `CATALOGO` AS 'CATEGORIA_PRODUCTO',   "+
        " B. `CATALOGO` AS 'CLASE_PRODUCTO'  "+
        " FROM `producto` AS P "+
        " INNER JOIN `catalogo` AS C ON P. `CATEGORIA_PRODUCTO` =  C. `ID_CATALOGO`"+
        " INNER JOIN `catalogo` AS B ON P. `CLASE_PRODUCTO` =  B. `ID_CATALOGO` "+
        " WHERE `ID_PRODUCTO` = "+connection.escape(id)+
        "ORDER BY `ID_PRODUCTO`"
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