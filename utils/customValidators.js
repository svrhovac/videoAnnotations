var db = require(mainConfig.paths.db.mongodb);

var myexports = {};

myexports.isParsableObjectIdArrayValidatorConvertor = function(value, resultHolder) {
  var array;
  if( value.constructor === Array ) {
    array = value;
  } else {
    try {
      array = JSON.parse(value);
      if(array.constructor !== Array){
        return false;
      }
    } catch(err) {
      return false;
    }
  }

  resultHolder.result = [];
  try{

    for( var i = 0; i < array.length; i++ ){
      resultHolder.result.push(db.ObjectId(array[i]));
    }

  } catch(ex) {
    return false;
  }

  return true;

};

module.exports = myexports;
