const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploads/uploadImage");
const { validationRules, validationRulesEdit, validationResult } = require("../middlewares/validations/Vehicles");
const login = require("../middlewares/autentication/login");
const fs = require("fs");
const Vehicles = require("../controllers/vehicles");

router.get("/vehicle/:id", async (req, res) => {
   await Vehicles.listVehicle(req, res);
});

router.get("/vehicles/:status/:page?", async (req, res) => {
   await Vehicles.listVehicles(req, res);
});

router.get("/vehiclesByType/:type/:page?", async (req, res) => {
   await Vehicles.listVehiclesByType(req, res);
});

router.get("/vehiclesByModel/:model/:page?", async (req, res) => {
   await Vehicles.listVehiclesByModel(req, res);
});

router.post("/vehicles", login, upload.single("img"), validationRules, async (req, res) => {

   // Verifica se foi passada uma img via form
   if(!req.file){

      const validationErros = validationResult(req);
         
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

   }else{

      const { path: imgPath } = req.file;
   
      const validationErros = validationResult(req);
   
      if(!validationErros.isEmpty()){
         fs.unlink(imgPath, (error) => {
            if(error){
               res.status(404).json(error);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }

   }

   await Vehicles.addVehicle(req, res);
   
});

router.patch("/vehicles/:id", login, upload.single("img"), validationRulesEdit, async (req, res) => {

   // Verifica se foi passada uma img via form
   if(!req.file){

      const validationErros = validationResult(req);
         
      if(!validationErros.isEmpty()){
         return res.status(400).json({ errors: validationErros.array() });
      }

   }else{

      const { path: imgPath } = req.file;
   
      const validationErros = validationResult(req);
   
      if(!validationErros.isEmpty()){
         fs.unlink(imgPath, (error) => {
            if(error){
               res.status(404).json(error);
            }
         });
         return res.status(400).json({ errors: validationErros.array() });
      }
      
   }

   await Vehicles.editVehicle(req, res);

});

router.delete("/vehicles/:id", login, async (req, res) => {
   await Vehicles.deleteVehicle(req, res);
});

module.exports = router;