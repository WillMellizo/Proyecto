//#region METODO LISTAR
const express = require('express');
const router = express.Router();

var Materia_PrimaModelo = require('../Modelos/Materia_PrimaModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        Materia_PrimaModelo.getMateria_Primas(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR
router.post("/", function (req, res) {
    var Materia_PrimaData = {
        ID_MATERIA_PRIMA: null,
        NOM_MATERIA_PRIMA: req.body.NOM_MATERIA_PRIMA,
        CANTIDAD: req.body.CANTIDAD,
        TIPO_MP: req.body.TIPO_MP,
        PRESENTACION_MP: req.body.PRESENTACION_MP

    };

    Materia_PrimaModelo.insertMateria_Prima(Materia_PrimaData, function (error, data) {
        /*console.log(" 44 materia_prima "+Materia_PrimaData.ID_MATERIA_PRIMA+" ini "
        +"ini"+Materia_PrimaData.NOM_MATERIA_PRIMA+"ini"+Materia_PrimaData.CANTIDAD+"ini"+
        Materia_PrimaData.TIPO_MP+"ini"+Materia_PrimaData.PRESENTACION_MP);*/

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
    var Materia_PrimaData = {
        ID_MATERIA_PRIMA: req.body.ID_MATERIA_PRIMA,
        NOM_MATERIA_PRIMA: req.body.NOM_MATERIA_PRIMA,
        CANTIDAD: req.body.CANTIDAD,
        TIPO_MP: req.body.TIPO_MP,
        PRESENTACION_MP: req.body.PRESENTACION_MP
    };

    Materia_PrimaModelo.updateMateriaprima(Materia_PrimaData, function (error, data){
        if(data && data){
            res.status(200).json(data);
        }else{
            res.status(500).send({error: "Actualizacion fallida"});
        }
    });
});
//#endregion
//#region METODO CONSULTA ID
router.get("/:id", function(req, res){
    var id = req.params.id;

    if(!isNaN(id)){
        Materia_PrimaModelo.getMateria_Primasid(id, function(error,data){
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