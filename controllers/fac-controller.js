const Faculty = require('../models/faculty-model')
const Branch = require('../models/branch-model')
const Staff = require('../models/worker-model')
const bodyParser = require('body-parser')

getAllFaculties = async (req, res) => {
    await Faculty.find({}, (err, faculties) => {  //find({ВСЁ})
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!faculties.length) {
            return res
                .status(404)
                .json({ success: false, error: `Факультетов\\Институтов в базе нет` })
        }
        // getBranchesByfac()
        return res.status(200)
            .status(200)
            .json({ success: true, data: faculties }) //всех
    }).catch(err => console.log(err))
}

getAllBranches = async (req, res) => {
    await Branch.find({}, (err, branches) => {  //find({ВСЁ})
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!branches.length) {
            return res
                .status(404)
                .json({ success: false, error: `Подразделений в базе нет` })
        }
        return res.status(200)
            .status(200)
            .json({ success: true, data: branches }) //всех
    }).catch(err => console.log(err))
}

getFacultyById = async (req, res) => {
    await Faculty.findOne({ _id: req.params.id }, (err, faculty) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!faculty) {
            return res
                .status(404)
                .json({ success: false, error: `Такой Факультет\\Институт не найден` })
        }
        return res
            .status(200)
            .json({ success: true, data: faculty }) 
    }).catch(err => console.log(err))
}

getBranchById = async (req, res) => {
    await Branch.findOne({ _id: req.params.id }, (err, branch) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!branch) {
            return res
                .status(404)
                .json({ success: false, error: `Такое подразделение не найдено` })
        }
        return res
            .status(200)
            .json({ success: true, data: branch }) 
    }).catch(err => console.log(err))
}

getBranchesByFac = async (req, res) => {
     Branch.find({ faculty_id: req.params.id }, (err, branches) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!branches.length) {
            return res
                .status(404)
                .json({ success: false, error: `Не найдено подразделений из данного Факультета\\Института` })
        }
        return res
            .status(200)
            .json({ success: true, data: branches }) 
    }).catch(err => console.log(err))
    
}

addAFaculty = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию',
        })
    }

    const faculty = new Faculty(body)

    if (!faculty) {
        return res
            .status(400)
            .json({ success: false, error: err })
    }

    faculty
        .save()                                   //сохраняет по модели
        .then(() => {
            return res.status(201).json({
                success: true,
                id: faculty._id,
                message: 'Факультут\\Институт добавлена',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Факультет\\Институт не был добавлен',
            })
        })
}

addABranch = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию',
        })
    }

    const branch = new Branch(body)

    if (!branch) {
        return res
            .status(400)
            .json({ success: false, error: err })
    }

    branch
        .save()                                  
        .then(() => {
            return res.status(201).json({
                success: true,
                id: branch._id,
                message: 'Подразделение добавлено',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Подразделение не было добавлено',
            })
        })
}

updateAFaculty = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию для обновления',
        })
    }

    Faculty.findOne({ _id: req.params.id }, (err, faculty) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Такой Факультет\\Институт не найден',
            })
        }
        faculty.fac_name = body.fac_name
        faculty.boss = body.boss
        faculty.contact = body.contact

        faculty
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: faculty._id,
                    message: 'Информация о Факультуте\\Институте обновлена',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Информация о Факультете\\Институте не была обновлена',
                })
            })
    })
}

updateABranch = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию для обновления',
        })
    }

    Branch.findOne({ _id: req.params.id }, (err, branch) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Такое подразделение не найдено',
            })
        }
        branch.bra_type = body.bra_type
        branch.bra_name = body.bra_name
        branch.faculty_id = body.faculty_id
        branch.boss = body.boss
        branch.contact = body.contact

        branch
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: branch._id,
                    message: 'Информация о подразделении обновлена',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Информация об подразделении не была обновлена',
                })
            })
    })
}

deleteAFaculty = async (req, res) => {
    await Faculty.findOneAndDelete({ _id: req.params.id }, (err, faculty) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!faculty) {
            return res
                .status(404)
                .json({ success: false, error: `Такой Факультет\\Институт не найден` })
        }

        Branch.deleteMany({ faculty_id: req.params.id }, (er, branches) => {
            if (er) {
                return res.status(400).json({ success: false, error: er })
            }
            if (!branches.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Подразделений с такого Факультета\\Института не найдено` })
            }
            return res.status(200).json({ success: true, data: branches })
        }).catch(er => console.log(er))

        // TODO: добавить удаление записей-ссылок на удалённые подразделения

        return res.status(200).json({ success: true, data: faculty })
    }).catch(err => console.log(err))
}

deleteABranch = async (req, res) => {
    await Branch.findOneAndDelete({ _id: req.params.id }, (err, branch) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!branch) {
            return res
                .status(404)
                .json({ success: false, error: `Такое подразделение не найдено` })
        }

        return res.status(200).json({ success: true, data: branch })

    }).catch(err => console.log(err))
}

module.exports = {
    getAllFaculties,
    getFacultyById,
    addAFaculty,
    updateAFaculty,
    deleteAFaculty,

    getAllBranches,
    getBranchById,
    getBranchesByFac,
    // deleteBranchesByfac,
    addABranch,
    deleteABranch,
    updateABranch,
}