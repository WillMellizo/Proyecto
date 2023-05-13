const express = require('express');
const router = express.Router();

var PrimerInformeModelo = require('../Modelos/PrimerInformeModelo');

module.exports = function(){
    
    //#region Metodo Consultar primer informe
    router.get("/:id", function(req, res){
        var id = req.params.id;
    
        if(!isNaN(id)){
            PrimerInformeModelo.getPrimInfoId(id, function(error,data){
                if(typeof data !== "undefined" && data.length > 0){
                    res.status(200).json(data);
                }else{
                    res.json(404,{msg: "Registro no existe"});
                }
            });
        }else{
            res.status(500).json({msg: "Error"});
        }
    });
    //#endregion

    return router;
}