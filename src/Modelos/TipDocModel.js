const connnection = require('../conexion');

var TipDocModel = {};

TipDocModel.getTiposDocs = function (callback)
{
    if(connnection)
    {
        var sql = "SELECT `id_tip_doc`, `tipo_documento`, `iniciales_tip_doc`  FROM `ct_tipos_documentos` ORDER BY`tipo_documento`";
 

    connnection.query(sql, function(error, rows)
    {
        if(error)
        {
            throw error;
        }
        else
        {
            //devuelve las fulas como un Json
            callback(null, rows);
            //convierte las filas Json a una cadena de texto para Angular
            //callback(null, JSON.stringify(rows));
        }
    });

    }
}
module.exports = TipDocModel;

//-----------------------------------------------------------
//insertar datos 
TipDocModel.insertTipDoc = function (TipDocData, callback) {
    if (connnection) {
        var sql = " INSERT INTO ct_tipos_documentos SET ?";

        connnection.query(sql, TipDocData, function (error, result) {
            console.log(" 55 tipo doc "+TipDocData.tipo_documento+" ini "
            +TipDocData.iniciales_tip_doc);
            if (error) {
                throw error;

            } else {
                callback(null, { "msg": "Registro insertado" });
            }
        });
    }
};

//Eliminar datos
TipDocModel.deleteTipDoc = function(TipDocData, callback){
    if(connnection){
        var sql = "DELETE FROM ct_tipos_documentos WHERE id_tip_doc = "
        + connnection.escape(TipDocData.id_tip_doc)+";";
        connnection.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg: ": "Registro eliminado"});
            }
        });
    }
}

//actualizar datos
TipDocModel.updateTipDoc = function(TipDocData, callback){
    if(connnection){
        var sql = "UPDATE ct_tipos_documentos SET tipo_documento = "+
        connnection.escape(TipDocData.tipo_documento)
        +", iniciales_tip_doc = "+
        connnection.escape(TipDocData.iniciales_tip_doc)
        +" WHERE id_tip_doc = "+
        connnection.escape(TipDocData.id_tip_doc)+";";
        connnection.query(sql, function(error, result){
            if(error){
                throw error;
            }else{
                callback(null, {"msg:": "Registro Actualizado"});
            }
        });
    }
}