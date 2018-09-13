const responses = require('../models/responses');
const messagesService = require('../services/messages.service')
const emailsService = require('../services/emails.service')
const apiPrefix = '/api/messages'

module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _readAll(req, res) {
    messagesService.readAll(req.query.page)
        .then(messages => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = messages
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        });
}

function _readById(req, res) {
    messagesService.readById(req.params.id)
        .then(message => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = message
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _create(req, res) {
    messagesService.create(req.model)
        .then(id => {
            let email= Object.assign(
                {toEmail: process.env.SENDGRID_TO_EMAIL}, 
                {senderName: req.model.name}, 
                {senderEmail : req.model.email}, 
                {message : req.model.message},
                {id: id})
            emailsService.sendRegistrationEmailConfirmation(email)
            return id
        })
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = id
            res.status(201)
                .location(`${apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _update(req, res) {
    messagesService.update(req.params.id, req.model)
        .then(message => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    messagesService.delete(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
}

