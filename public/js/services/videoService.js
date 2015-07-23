spa.service("videoService", ['$http', function($http){

	this.vidList;
	idTrenutnog = 0; //MILAN
  	this.tags;

    this.getVideos = function(){
	     return $http.get("/videos").success(function(data){
          console.log("lista"+data);
			     return this.vidList = data;
		   }).
		    error(function(data){
			   console.log("greska!!!");
		   });
		//console.log(this.vidList)
		//return this.vidList;

    };

    this.getVideoProperty = function(id){
		idTrenutnog = id; //MILAN
	    var request="/videos/" + id;
	   
	    return $http.get(request).success(function(data){
			return data;
		}).
		error(function(data){
			console.log("greska!!!");
		});
		/*console.log("looking for video property");
		console.log(this.vidList);
		for(i=0; i<this.vidList.length-1; i++){console.log("i: "+i);console.log(this.vidList[i]);
			if(this.vidList[i]._id == id){console.log("if");
				console.log(this.vidList[i]);
				return this.vidList[i];
			}
			else if(i == this.vidList.length-1)
				console.log("couldnt find video property with id: " + id);
		}*/
	
    };

    this.setCurrAnno = function(a){
      this.currentAnno = a;
    };
	
	this.getVidList = function(){
		return this.vidList;
	};

  this.loadTags = function(){
    return $http.get("/tags").success(function(data){
           return this.tags = data;
       }).
        error(function(data){
         console.log("greska!!!");
          });
  };

    this.sendNewAnnoToServer = function(anno,vidID){ //MILAN za stnimanje nove
      var pom;
	  var postBody = {"text":anno.text,"startTime":anno.startTime,"endTime":anno.endTime,"tags":anno.tags}
    console.log(postBody);
	  /*$http({
		  method: 'POST',
		  url:'/annotation/'+ vidID +'/add',
		  data:JSON.stringify(postBody),
		  headers: {'Content-Type': 'application/json'}
	  })*/
    return $http.post('/annotation/'+ vidID +'/add', postBody).
		success(function(data, status, headers, config) {
			return data;
			//anno.id = data.id; //neznam da li se prosledjuje parametar fji preko pokazivaca
			// this callback will be called asynchronously
			// when the response is available
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			});
    };
	
	this.sendAnnotationToServer = function(anno,vidID){ //MILAN za snimanje postojece
	  
	  
	  var pom;
	  var postBody = {"text":anno.text,"startTime":anno.startTime,"endTime":anno.endTime,"tags":anno.tags}
	  $http.put('http://localhost:3000/annotation/'+vidID+'/edit/'+anno.id, postBody)
	  .success(function(data, status, headers, config) {
			console.log(data);
			// this callback will be called asynchronously
			// when the response is available
		}).error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log("neuspjesno otislo otislo!!!!!");
			});
	  /*$http({
		  method: 'PUT',
		  url:'http://192.168.137.14:3000/annotation/'+idTrenutnog+'/edit/'+anno.id,
		  data:postBody,
		  headers: {'Content-Type': 'application/json'}
	  }).
		success(function(data, status, headers, config) {
			console.log(data);
			// this callback will be called asynchronously
			// when the response is available
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log("neuspjesno otislo otislo!!!!!");
			});*/
    };

    this.deleteAnnoFromServer = function(anno,vidID){
        $http.delete('http://localhost:3000/annotation/'+vidID+'/remove/'+anno.id)
        .success(function(data, status, headers, config) {
        console.log(data);
      // this callback will be called asynchronously
      // when the response is available
    }).error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("neuspjesno otislo otislo!!!!!");
      });
    };
}]);