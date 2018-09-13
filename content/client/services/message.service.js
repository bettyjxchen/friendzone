 /* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function() {
    'use strict'

    angular
        .module('client.services')
        .factory('messageService', MessageService) 

    MessageService.$inject = ['$http', '$q']

    function MessageService($http, $q) {
        return {
            readAll: _readAll,
            readById: _readById,
            create: _create,
            update: _update,
            delete: _delete
        }

        function _readAll(page) {
            if (!page) {
                page = 1
            }
            return $http.get(`/api/messages?page=${page}`)
                .then(data => convertAllDates(data))
                .catch(onError)
        }

        function _readById(id) {
            return $http.get(`/api/messages/${id}`)
                .then(data =>
                    convertDate(data)
                )
                .catch(onError)
        }

        function _create(data) {
            return $http.post('/api/messages', data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _update(data) {
            return $http.put(`/api/messages/${data._id}`, data)
                .then(xhrSuccess)
                .catch(onError)
        }

        function _delete(id) {
            return $http.delete(`/api/messages/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(responses) {
            return responses.data
        }

        function convertAllDates(data){
            for (let x = 0; x < data.data.items.messages.length; x++) {
                data.data.items.messages[x].dateCreated = new Date(data.data.items.messages[x].dateCreated)     
                data.data.items.messages[x].dateModified = new Date(data.data.items.messages[x].dateModified)
                if (data.data.items.messages[x].dateDeactivated !== null) {
                    data.data.items.messages[x].dateDeactivated = new Date(data.data.items.messages[x].dateDeactivated)
                }
            }
            return data.data 
        }

        function convertDate(data){
            data.data.item.dateCreated = new Date(data.data.item.dateCreated)
            data.data.item.dateModified = new Date(data.data.item.dateModified)
            if (data.data.item.dateDeactivated !== null) {
                data.data.item.dateDeactivated = new Date(data.data.item.dateDeactivated)
            }
            return data.data
        }

        function onError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }
    }
})()
