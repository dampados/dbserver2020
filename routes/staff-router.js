const express = require('express')
const staffController = require('../controllers/staff-controller')

const routerOfExpress = express.Router()

routerOfExpress.get('/staff/',          staffController.getAllStaff)
routerOfExpress.get('/staff/:id',       staffController.getWorkerById)
routerOfExpress.get('/staff/show/:id',  staffController.getWorkerById) 
routerOfExpress.post('/staff/add',      staffController.addAWorker)
routerOfExpress.put('/staff/:id',       staffController.updateAWorker)
routerOfExpress.delete('/staff/:id',    staffController.deleteAWorker)
routerOfExpress.get('/staff_by_bra/:id',    staffController.getAllStaffByBra)
routerOfExpress.get('/staff_with_academic/',    staffController.getAllStaffWithAcademic)

module.exports = routerOfExpress





