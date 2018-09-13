const Message = require('../models/message')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _readAll(queryPage) {
    var skip = (queryPage - 1) * 15
    var limit = 15

    if (!queryPage) {
        skip = 0
    }

    return conn.conn().collection('messages').aggregate([
        {
            $match: { 'dateDeactivated': null }
        },
        {
            $sort: {
                "dateCreated": -1
            }
        },
        {
            $facet: {
                count: [
                    { $count: 'count' },
                ],
                messages: [
                    {
                        $skip: skip
                    },
                    {
                        $limit: limit
                    }
                ]
            }
        },
        {
            $project: {
                count: { $arrayElemAt: ['$count', 0] },
                messages: 1
            }
        },
        {
            $project: {
                count: '$count.count',
                messages: 1
            }
        }
    ]).toArray()
        .then(messages => {
            messages = messages[0]
            messages.messages.forEach(message => message._id = message._id.toString())
            return messages
        })
}

function _readById(id) {
    return conn.conn().collection('messages').findOne({ _id: new ObjectId(id), 'dateDeactivated': null })
        .then(message => {
            message._id = message._id.toString() 
            return message
        })
}

function _create(model) {
    let doc = {
       name: model.name,
       email: model.email,
       message: model.message,
       isRead: false,
       dateCreated: new Date(),
    }
    return conn.conn().collection('messages').insert(doc)
        .then(result => {
            return result.insertedIds[0].toString()
        }) 
}

function _update(id, model) {
    let doc = {
        name: model.name,
        email: model.email,
        message: model.message,
        isRead: model.isRead,
        dateModified: new Date()
     }

    return conn.conn().collection('messages').updateOne( { _id: new ObjectId(id) }, { $set: doc } )
        .then(result => Promise.resolve()) 
}

function _delete(id) {
    return conn.conn().collection('messages').updateOne({ _id: new ObjectId(id) }, { $currentDate: { 'dateModified': true, 'dateDeactivated': true } })
        .then(result => Promise.resolve()) 
}
