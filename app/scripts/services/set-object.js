app.service('idService', function () {
    var idSaved;
    var objSaved = {};

    var setId = function (id) {
        idSaved = id;
    }

    var getId = function () {
        return idSaved;
    }

    var setObj = function (obj) {
        objSaved = obj;
    }

    var getObj = function () {
        return objSaved;
    }

    return {
        setId: setId,
        getId: getId,
        setObj: setObj,
        getObj: getObj
    };

});