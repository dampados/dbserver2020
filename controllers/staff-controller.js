const Worker = require('../models/worker-model')


getAllStaff = async (req, res) => {
    await Worker.find({}, (err, workers) => { 
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!workers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Сотрудники не найдены` })
        }
        return res.status(200)
            .status(200)
            .json({ success: true, data: workers }) //всех
    }).catch(err => console.log(err))
}

getAllStaffWithAcademic = async (req, res) => {
    Worker.find({ academic_rank: { $ne : "" } }, (err, workers) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!workers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Не найдены сотрудники без записей о ранках` })
        }
        return res
            .status(200)
            .json({ success: true, data: workers }) 
    }).catch(err => console.log(err))
}

getAllStaffByBra = async (req, res) => {
    Worker.find({ branches: req.params.id }, (err, worker) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!worker.length) {
            return res
                .status(404)
                .json({ success: false, error: `Не найдены сотрудники из данного подразделения` })
        }
        return res
            .status(200)
            .json({ success: true, data: worker }) 
    }).catch(err => console.log(err))
}

getWorkerById = async (req, res) => {
    await Worker.findOne({ _id: req.params.id }, (err, worker) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!worker) {
            return res
                .status(404)
                .json({ success: false, error: `Сотрудник не найден` })
        }
        return res
            .status(200)
            .json({ success: true, data: worker }) //одного
    }).catch(err => console.log(err))
}

addAWorker = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию',
        })
    }

    const worker = new Worker(body)

    if (!worker) {
        return res
            .status(400)
            .json({ success: false, error: err })
    }

    worker
        .save()                                   
        .then(() => {
            return res.status(201).json({
                success: true,
                id: worker._id,
                message: 'Сотрудник добавлен',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Сотрудник не был добавлен',
            })
        })
}

updateAWorker = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию для обновления',
        })
    }

    Worker.findOne({ _id: req.params.id }, (err, worker) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Сотрудник не был найден',
            })
        }
        worker.firstName        = body.firstName
        worker.middleName       = body.middleName
        worker.lastName         = body.lastName

        worker.position         = body.position
        worker.birth_date       = body.birth_date
        worker.speciality       = body.speciality
        worker.qualification    = body.qualification
        worker.ovarral_standing = body.ovarral_standing

        worker.academic_degree  = body.academic_degree
        worker.academic_rank    = body.academic_rank

        worker.phone_numbers    = body.phone_numbers

        worker.branches         = body.branches
        worker.laboratories     = body.laboratories

        worker
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: worker._id,
                    message: 'Информация о сотруднике обновлена',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Информация о сотруднике не была обновлена',
                })
            })
    })
}

deleteAWorker = async (req, res) => {
    await Worker.findOneAndDelete({ _id: req.params.id }, (err, worker) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!worker) {
            return res
                .status(404)
                .json({ success: false, error: `Сотрудник не был найден` })
        }

        return res.status(200).json({ success: true, data: worker })

    }).catch(err => console.log(err))
}

module.exports = {
    getAllStaff,
    getWorkerById,
    addAWorker,
    updateAWorker,
    deleteAWorker,
    getAllStaffByBra,
    getAllStaffWithAcademic,
}