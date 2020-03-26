const express = require('express')
const facController = require('../controllers/fac-controller')

const routerOfExpress = express.Router()

routerOfExpress.get('/faculties',           facController.getAllFaculties) 
routerOfExpress.get('/faculty/:id',         facController.getFacultyById)
routerOfExpress.get('/faculty_b/:id',       facController.getBranchesByFac)

routerOfExpress.post('/faculty/add',        facController.addAFaculty)
routerOfExpress.put('/faculty/:id',         facController.updateAFaculty)
routerOfExpress.delete('/faculty/:id',      facController.deleteAFaculty)

routerOfExpress.get('/branches',            facController.getAllBranches)
routerOfExpress.get('/branch/:id',          facController.getBranchById)
routerOfExpress.post('/faculty_b/:id/add',  facController.addABranch)
routerOfExpress.put('/faculty_bu/:id',      facController.updateABranch)
routerOfExpress.delete('/branch/:id',       facController.deleteABranch)


module.exports = routerOfExpress





