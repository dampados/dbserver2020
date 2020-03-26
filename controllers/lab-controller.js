const Laboratory = require('../models/laboratory-model')
const bodyParser = require('body-parser')

getAllLaboratories = async (req, res) => {
    await Laboratory.find({}, (err, laboratories) => {  //find({ВСЁ})
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!laboratories.length) {
            return res
                .status(404)
                .json({ success: false, error: `Лабораторий в базе нет` })
        }
        return res.status(200)
            .status(200)
            .json({ success: true, data: laboratories }) //всех
    }).catch(err => console.log(err))
}

getLaboratoryById = async (req, res) => {
    await Laboratory.findOne({ _id: req.params.id }, (err, laboratory) => {
        if (err) {
            return res
                .status(400)
                .json({ success: false, error: err })
        }
        if (!laboratory) {
            return res
                .status(404)
                .json({ success: false, error: `Такая лаборатория не найдена` })
        }
        return res
            .status(200)
            .json({ success: true, data: laboratory }) //одного
    }).catch(err => console.log(err))
}

addALaboratory = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию',
        })
    }

    const laboratory = new Laboratory(body)

    if (!laboratory) {
        return res
            .status(400)
            .json({ success: false, error: err })
    }

    laboratory
        .save()                                   //сохраняет по модели
        .then(() => {
            return res.status(201).json({
                success: true,
                id: laboratory._id,
                message: 'Лаборатория добавлена',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Лаборатория не была добавлена',
            })
        })
}

updateALaboratory = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Введите информацию для обновления',
        })
    }

    Laboratory.findOne({ _id: req.params.id }, (err, laboratory) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Такая лаборатория не найдена',
            })
        }
        laboratory.lab_name = body.lab_name
        laboratory.boss = body.boss
        laboratory.contact = body.contact

        laboratory
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: laboratory._id,
                    message: 'Информация о лаборатории обновлена',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Информация о лаборатории не была обновлена',
                })
            })
    })
}

deleteALaboratory = async (req, res) => {
    await Laboratory.findOneAndDelete({ _id: req.params.id }, (err, laboratory) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!laboratory) {
            return res
                .status(404)
                .json({ success: false, error: `Такая лаборатория не найдена` })
        }

        // TODO: добавить удаление записей-ссылок на удалённые лаборатории

        return res.status(200).json({ success: true, data: laboratory })

    }).catch(err => console.log(err))
}


module.exports = {
    getAllLaboratories,
    getLaboratoryById,
    addALaboratory,
    updateALaboratory,
    deleteALaboratory,
}