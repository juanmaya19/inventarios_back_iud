const TipoEquipo = require('../models/tipoEquipo')
const {
    request,
    response
} = require('express')

const createTipoEquipo = async (req = request,
    res = response) => {
    try {

        const nombre = (req.body.nombre) ?
            req.body.nombre.toUpperCase() :
            '';
        const tipoEquipoBD = await TipoEquipo.findOne({
            nombre
        })
        if (tipoEquipoBD) {
            return res.status(400).json({
                msg: 'Ya existe nombre'
            })
        }
        const datos = {
            nombre
        }

        const tipoEquipo = new TipoEquipo(datos)
        console.log(tipoEquipo)
        await tipoEquipo.save()
        res.status(201).json(tipoEquipo)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}


const getTiposEquipo = async (req = request,
    res = response) => {
    try {
        console.log(req.query)
        const estado = req.query.estado
        const query = {
            estado: estado
        }
        const tipoequiposDB = await TipoEquipo.find(query)
        return res.json(tipoequiposDB)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}


const getTipoEquipoByID = async (req = request,
    res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const query = {
            _id: id
        }
        const tipoequipoDB = await TipoEquipo.findOne(query)
        return res.json(tipoequipoDB)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}


const updateTipoEquipoByID = async (req = request,
    res = response) => {
    try {
        console.log(req.body)
        console.log(req.params)
        const data = req.body
        const id = req.params.id
        data.fechaActualizacion = new Date()
        console.log(data)
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {
            new: true
        })
        return res.json(tipoEquipo)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}


const deleteTipoEquipoByID = async (req = request,
    res = response) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const tipoequipoDB = await TipoEquipo.findById(id)
        if (!tipoequipoDB) {
            return res.status(404).json({
                msg: 'No existe el tipo equipo'
            })
        }
        await TipoEquipo.findByIdAndDelete(id)
        return res.status(204).json({
            msg: 'Borrado',
            id
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {
    createTipoEquipo,
    getTiposEquipo,
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
}