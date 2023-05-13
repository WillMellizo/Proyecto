//#region METODO LISTAR
const express = require('express');
const router = express.Router();

var PersonalModelo = require('../Modelos/PersonalModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        PersonalModelo.getPersonals(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR
router.post("/", function (req, res) {
    var personalData = {
        ID_PERSONAL: null,
        PNOM_PERSONAL: req.body.PNOM_PERSONAL,
        SNOM_PERSONAL: req.body.SNOM_PERSONAL,
        PAPELL_PERSONAL: req.body.PAPELL_PERSONAL,
        SAPELL_PERSONAL: req.body.SAPELL_PERSONAL,
        TIPO_DOC: req.body.TIPO_DOC,
        NUM_DOC: req.body.NUM_DOC,
        CARGO_PERSONA: req.body.CARGO_PERSONA
    };

    //Uso de la funcion insertar
    PersonalModelo.insertPersonal(personalData, function (error, data) {
        console.log(" 44 personal "+personalData.PNOM_PERSONAL+" ini "
            +personalData.SNOM_PERSONAL+"ini"+personalData.PAPELL_PERSONAL+"ini"
            +personalData.SAPELL_PERSONAL+"ini"+personalData.TIPO_DOC+"ini"
            +personalData.NUM_DOC+"ini"+personalData.CARGO_PERSONA);
        
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
router.put("/",function(req,res){
    var PersonalData = {
        ID_PERSONAL: req.body.ID_PERSONAL,
        PNOM_PERSONAL: req.body.PNOM_PERSONAL,
        SNOM_PERSONAL: req.body.SNOM_PERSONAL,
        PAPELL_PERSONAL: req.body.PAPELL_PERSONAL,
        SAPELL_PERSONAL: req.body.SAPELL_PERSONAL,
        TIPO_DOC: req.body.TIPO_DOC,
        NUM_DOC: req.body.NUM_DOC,
        CARGO_PERSONA: req.body.CARGO_PERSONA
    };

    //Uso de la funcion actualizar
    PersonalModelo.updatePersonal(PersonalData, function (error, data){
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
        PersonalModelo.getPersonalsid(id, function(error,data){
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