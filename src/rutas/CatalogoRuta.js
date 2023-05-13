//#region METODO LISTAR
const express = require('express');
const router = express.Router();

var CatalogoModelo = require('../Modelos/CatalogoModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        CatalogoModelo.getCatalogos(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR
router.post("/", function (req, res) {
    var CatalogoData = {
        ID_CATALOGO: null,
        CATALOGO: req.body.CATALOGO,
        TIPO_CATALOGO: req.body.TIPO_CATALOGO
    };

    //Uso de la funcion insertar
    CatalogoModelo.insertCatalogo(CatalogoData, function (error, data) {
        console.log(" 44 catalogo "+ CatalogoData.CATALOGO+" ini "+CatalogoData.TIPO_CATALOGO
        );
        //Muestra el mensaje
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).send({ error: "boo:(" })
        }
    });
});
//#endregion
//#region METODO MODIFICAR
router.put("/", function(req, res){
    var CatalogoData={
        ID_CATALOGO: req.body.ID_CATALOGO,
        CATALOGO: req.body.CATALOGO,
        TIPO_CATALOGO: req.body.TIPO_CATALOGO
    };

    CatalogoModelo.updateCatalogo(CatalogoData, function(error,data){
        if(data && data){
            res.status(200).json(data);
        }else{
            res.status(500).send({error: "Actualizacion fallida"});
        }
    });
});
//#endregion
//#region METODO CONSULTAR ID
router.get("/:tipcat", function(req, res){
    var tipcat = req.params.tipcat;

    if(!isNaN(tipcat)){
        CatalogoModelo.getCatalogosTC(tipcat, function(error,data){
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

router.get("/:tipcat/:id", function(req, res){
    var tipcat = req.params.tipcat;
    var id = req.params.id;


    console.log("  aca 99 " + tipcat + " -  " + id);
    if(!isNaN(id)){
        CatalogoModelo.getCatalogosID(tipcat, id, function(error,data){
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