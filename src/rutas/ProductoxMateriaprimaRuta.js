//#region METODO LISTAR
const express = require('express');
const router = express.Router();

var ProductoxMateriaprimaModelo = require('../Modelos/ProductoxMateriaprimaModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        ProductoxMateriaprimaModelo.getProductoxMateriaprimas(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR
router.post("/", function (req, res) {
    var ProdXMPData = {
        ID_PROD_X_MAT: null,
        ID_MATERIA_PRIMA: req.body.ID_MATERIA_PRIMA,
        ID_PRODUCTO: req.body.ID_PRODUCTO
    };

 ProductoxMateriaprimaModelo.insertProductoxMateriaprima(ProdXMPData, function (error, data) {
    console.log(" 44 productoxmateriaprima "+ProdXMPData.ID_MATERIA_PRIMA+" ini "
    +ProdXMPData.ID_PRODUCTO)
    ;
    
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
    var ProdXMPData = {
        ID_PROD_X_MAT: req.body.ID_PROD_X_MAT,
        ID_MATERIA_PRIMA: req.body.ID_MATERIA_PRIMA,
        ID_PRODUCTO: req.body.ID_PRODUCTO
    };

    //Uso de la funcion actualizar
    ProductoxMateriaprimaModelo.updateProductoxMateriaprima(ProdXMPData, function (error, data){
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
       ProductoxMateriaprimaModelo.getProductoxMateriaprimasid(id, function(error,data){
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