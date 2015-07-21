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
      console.log("1");
      console.log(err.message);
      return false;
    }
  }

  resultHolder.result = [];
  try{

    for( var i = 0; i < array.length; i++ ){
      resultHolder.result.push(db.ObjectId(array[i]));
    }

  } catch(ex) {
    console.log(ex.message);
    return false;
  }

  return true;

};

module.exports = myexports;
