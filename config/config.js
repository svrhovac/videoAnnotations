module.exports = {
  paths : {
    db : {
      mongodb: __dirname + '/../db/mongodb'
    },
    routes : {
      videos: __dirname + "/../routes/videos",
      index: __dirname + "/../routes/index",
      tags: __dirname + "/../routes/tags",
      owners: __dirname + "/../routes/owners",
      commonParams: __dirname + "/../routes/commonParams",
      annotation: __dirname + "/../routes/annotation",
<<<<<<< HEAD
      users: __dirname + "/../routes/users"
=======
      userConsent: __dirname + "/../routes/userConsent"
>>>>>>> 6a56b3298a82530ca5edc655ac116a5e41eb99be
    },
    utils : {
      customValidators : __dirname + "/../utils/customValidators"
    }

  }



};
