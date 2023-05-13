//#region METODON LISTAR
const express = require('express');
const router = express.Router();

var ProductoModelo = require('../Modelos/ProductoModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        ProductoModelo.getProductos(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR
router.post("/", function (req, res) {
    var ProductoData = {
        ID_PRODUCTO: null,
        NOM_PRODUCTO: req.body.NOM_PRODUCTO,
        CATEGORIA_PRODUCTO: req.body.CATEGORIA_PRODUCTO,
        CLASE_PRODUCTO: req.body.CLASE_PRODUCTO
    };

    ProductoModelo.insertproducto(ProductoData, function (error, data) {
        console.log(" 44 Producto "+ProductoData.ID_PRODUCTO+" ini "
        +"ini"+ProductoData.NOM_PRODUCTO+"ini"+ProductoData.CATEGORIA_PRODUCTO+"ini"+
        ProductoData.CLASE_PRODUCTO
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
    var ProductoData = {
        ID_PRODUCTO: req.body.ID_PRODUCTO,
        NOM_PRODUCTO: req.body.NOM_PRODUCTO,
        CATEGORIA_PRODUCTO: req.body.CATEGORIA_PRODUCTO,
        CLASE_PRODUCTO: req.body.CLASE_PRODUCTO
    };

    //Uso de la funcion actualizar
    ProductoModelo.updateProducto(ProductoData, function (error, data){
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
        ProductoModelo.getProductosid(id, function(error,data){
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