const express = require('express');
const router = express.Router();

var TipDocModel = require('../Modelos/TipDocModel')

module.exports = function()
{
    router.get("/", function (req, res)
    {
    TipDocModel.getTiposDocs (function (error, data)
        {
        res.status(200).json(data);
        });
    });

    return router;
}

//Muestra y captura los datos del metodo CRUL
router.post("/", function (req, res) {
    var TipDocData = {
        id_tip_doc: null,
        tipo_documento: req.body.tipo_documento,
        iniciales_tip_doc: req.body.iniciales_tip_doc
    };

    //Uso de la funcion insertar
    TipDocModel.insertTipDoc(TipDocData, function (error, data) {
        console.log(" 44 tipo doc "+ TipDocData.tipo_documento + " ini "+ TipDocData.iniciales_tip_doc);
        //Muestra el mensaje
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).send({ error: "boo:(" })
        }
    });
});

router.delete("/",function(req,res){
    var TipDocData={
        id_tip_doc: req.body.id_tip_doc,
        tipo_documento: null,
        iniciales_tip_doc: null
    };

    //Uso de la funcion delete
    TipDocModel.deleteTipDoc(TipDocData, function (error, data){
        if(data && data){
            res.status(200).json(data);
        }else{
            res.status(500).send({error: "boo("});
        }
    });
});

return router;

router.put("/",function(req,res){
    var TipDocData={
        id_tip_doc: req.body.id_tip_doc,
        tipo_documento: req.body.tipo_documento,
        iniciales_tip_doc: req.body.iniciales_tip_doc
    };

    //Uso de la funcion actualizar
    TipDocModel.updateTipDoc(TipDocData, function (error, data){
        if(data && data){
            res.status(200).json(data);
        }else{
            res.status(500).send({error: "boo("});
        }
    });
});
