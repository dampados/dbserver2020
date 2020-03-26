const express = require('express')
const labController = require('../controllers/lab-controller')

const routerOfExpress = express.Router()

routerOfExpress.get('/laboratories',        labController.getAllLaboratories)
routerOfExpress.get('/laboratories/:id',    labController.getLaboratoryById)
routerOfExpress.post('/laboratories/add',   labController.addALaboratory)
routerOfExpress.put('/laboratories/:id',    labController.updateALaboratory)
routerOfExpress.delete('/laboratories/:id', labController.deleteALaboratory)


module.exports = routerOfExpress





