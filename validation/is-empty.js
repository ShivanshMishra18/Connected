const isEmpty = obj => 
    obj === null ||
    obj === undefined || 
    (typeof(obj) === 'string' && obj.trim().length === 0) ||
    (typeof(obj) === 'object' && Object.keys(obj).length === 0)


module.exports = isEmpty