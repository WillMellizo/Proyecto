//#region METODO LISTAR
const express = require('express');
const router = express.Router();

var ContactoModelo = require('../Modelos/ContactoModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        ContactoModelo.getContactos(function(error,data)
        {
            res.status(200).json(data);
        });
    });
    return router;
}
//#endregion
//#region METODO INSERTAR 
router.post("/", function (req, res) {
    var contactoData = {
        ID_CONTACTO: null,
        ID_PERSONAL: req.body.ID_PERSONAL,
        DIRDATO_CONTACTO: req.body.DIRDATO_CONTACTO,
        TIPO_CONTACTO: req.body.TIPO_CONTACTO

    };

 
    ContactoModelo.insertContacto(contactoData, function (error, data) {
        console.log(" 55 contacto "+contactoData.ID_PERSONAL+" ini "
        +"ini"+ contactoData.DIRDATO_CONTACTO+"ini"+contactoData.TIPO_CONTACTO
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
router.put("/",function(req,res){
    var ContactoData={
        ID_CONTACTO: req.body.ID_CONTACTO,
        ID_PERSONAL: req.body.ID_PERSONAL,
        DIRDATO_CONTACTO: req.body.DIRDATO_CONTACTO,
        TIPO_CONTACTO: req.body.TIPO_CONTACTO
    };

    //Uso de la funcion actualizar
    ContactoModelo.updateContacto(ContactoData, function (error, data){
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
        ContactoModelo.getContactosid(id, function(error,data){
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