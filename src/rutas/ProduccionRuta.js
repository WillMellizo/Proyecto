//#region METODO LISTAR
const express = require('express');
const router = express.Router();

var ProduccionModelo = require('../Modelos/ProduccionModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        ProduccionModelo.getProduccions(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR
router.post("/", function (req, res) {
    var ProduccionData = {
        ID_PRODUCCION: null,
        CALIDAD: req.body.CALIDAD,
        FEC_PRODUCCION: req.body.FEC_PRODUCCION,
        CANTIDAD_PRODUCCION: req.body.CANTIDAD_PRODUCCION,
        DEFECTUOSOS: req.body.DEFECTUOSOS,
        ID_PERSONAL: req.body.ID_PERSONAL,
        ID_PRODUCTO: req.body.ID_PRODUCTO

    };

   ProduccionModelo.insertproduccion(ProduccionData, function (error, data) {
        console.log(" 44 Produccion "+ProduccionData.ID_PRODUCCION+" ini "
        +"ini"+ProduccionData.CALIDAD+"ini"+ProduccionData.FEC_PRODUCCION+"ini"+
        ProduccionData.CANTIDAD_PRODUCCION+"ini"+ProduccionData.DEFECTUOSOS+"ini"+
        ProduccionData.ID_PERSONAL+"ini"+ProduccionData.ID_PRODUCTO
        );

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).send({ error: "boo:(" })
        }
    });
});
//#endregion
//#region METODO MODIFICAR
router.put("/",function(req,res){
    var ProduccionData = {
        ID_PRODUCCION: req.body.ID_PRODUCCION,
        CALIDAD: req.body.CALIDAD,
        FEC_PRODUCCION: req.body.FEC_PRODUCCION,
        CANTIDAD_PRODUCCION: req.body.CANTIDAD_PRODUCCION,
        DEFECTUOSOS: req.body.DEFECTUOSOS,
        ID_PERSONAL: req.body.ID_PERSONAL,
        ID_PRODUCTO: req.body.ID_PRODUCTO
    };

    //Uso de la funcion actualizar
    ProduccionModelo.updateProduccion(ProduccionData, function (error, data){
        if(data && data){
            res.status(200).json(data);
        }else{
            res.status(500).send({error: "boo("});
        }
    });
});
//#endregion
//#region METODO CONSULTA ID
router.get("/:id", function(req, res){
    var id = req.params.id;

    if(!isNaN(id)){
        ProduccionModelo.getProduccionsid(id, function(error,data){
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
//#region METODO PARA LLAMAR INFORME
router.get("/:IdPrimerInforme/:FecIni/:FecFin", function(req, res){
    var IdPrimerInforme = req.params.IdPrimerInforme;
    var FecIni = req.params.FecIni;
    var FecFin = req.params.FecFin;

        ProduccionModelo.getPrimInfoId(IdPrimerInforme, FecIni, FecFin, function(error,data){
            if(typeof data !== "undefined" && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404,{msg: "Registro no existe"});
            }
        });
});
//#endregion