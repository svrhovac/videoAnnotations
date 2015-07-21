spa.service("videoService", ['$http', function($http){

	this.vidList;
	idTrenutnog = 0; //MILAN


	this.vidList=[
{
 "_id":"55a50e8f8a9533a1b4f84f88",
 "title":"Video is cool",
 "description":"dont Learn all about your future",
 "duration":12345,
 "author":"John Neko",
 "path":"videocontent/video0.mp4",
 "annotations":[
    {
     "id":"11a7a50cf5fe9d10b6f3b75b",
     "text":"Text",
     "dateCreated":"2014-12-02T23:00:00.000Z",
     "startTime":4,"endTime":6,
     "tags":[
             "55a77acb8a9463a1b4f84f8d","55a8e616dbad751131fbd5c8","55a8e616dbad751131fbd5c9"
      ]
    } ,

    {
     "id":"35a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":5,
     "endTime":7,
     "tags":[
          "55a8e544dbad751131fbd5c5","55a77acb8a9463a1b4f84f8d"
      ]
   },
   {
     "id":"55a8b493852f4a2809482514",
     "text":"assarggdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":5,
     "endTime":9,
     "tags":[
          "55a8e616dbad751131fbd5c9","55a8e616dbad751131fbd5c8"
      ]
   }
 ]
},

{
 "_id":"55a11e8f8a3463a1b4f84f88",
 "title":"Video abo learning",
 "description":"Lear all about your future",
 "duration":12345,
 "author":"John Ko",
 "path":"videocontent/video1.mp4",
 "annotations":[
    {
     "id":"51a7a50cf5fe9d10b6f3b75b",
     "text":"Text something",
     "dateCreated":"2014-11-02T23:00:00.000Z",
     "startTime":3,"endTime":10,
     "tags":[
             "55a8e544dbad751131fbd5c5"
      ]
    } ,

    {
     "id":"52a8b493852f4a2809482514",
     "text":"another example",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":"12",
     "endTime":"15",
     "tags":[
       "1"
      ]
   },
   {
     "id":"53a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":"6",
     "endTime":"11",
     "tags":[
       "1"
      ]
   }
 ]
},

{
 "_id":"55a50e8f8a9233a1b4f84f88",
 "title":"Video about learning",
 "description":"Learn all about your future",
 "duration":12345,
 "author":"John Doe",
 "path":"videocontent/video2.mp4",
 "annotations":[
    {
     "id":"55a7a50cf5fe9d10b6f3b75b",
     "text":"Text drugi",
     "dateCreated":"2014-12-02T23:00:00.000Z",
     "startTime":55550,"endTime":90000,
     "tags":[
             "3"
      ]
    } ,

    {
     "id":"55a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":20,
     "endTime":"22",
     "tags":[
       "0"
      ]
   }
 ]
},

{
 "_id":"55a20e8f8a9463a1b4f84f88",
 "title":"Video about learning",
 "description":"Learn all about your future",
 "duration":12345,
 "author":"John Doe",
 "path":"videocontent/video3.mp4",
 "annotations":[
    {
     "id":"55a7a50cf5fe9d10b6f3b75b",
     "text":"Text neki",
     "dateCreated":"2014-12-02T23:00:00.000Z",
     "startTime":55545,"endTime":90000,
     "tags":[
             "3"
      ]
    } ,

    {
     "id":"55a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":10,
     "endTime":"13",
     "tags":[
       "2"
      ]
   }
 ]
},
{
 "_id":"55a50e8f8a9533a1b4f84f88",
 "title":"Video is cool",
 "description":"dont Learn all about your future",
 "duration":12345,
 "author":"John Neko",
 "path":"videocontent/video0.mp4",
 "annotations":[
    {
     "id":"55a7a50cf5fe9d10b6f3b75b",
     "text":"Text",
     "dateCreated":"2014-12-02T23:00:00.000Z",
     "startTime":55555,"endTime":100000,
     "tags":[
             "0"
      ]
    } ,

    {
     "id":"55a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":46,
     "endTime":"56",
     "tags":[
          "0"
      ]
   }
 ]
},

{
 "_id":"55a11e8f8a3463a1b4f84f88",
 "title":"Video abo learning",
 "description":"Lear all about your future",
 "duration":12345,
 "author":"John Ko",
 "path":"videocontent/video1.mp4",
 "annotations":[
    {
     "id":"51a7a50cf5fe9d10b6f3b75b",
     "text":"Text something",
     "dateCreated":"2014-11-02T23:00:00.000Z",
     "startTime":55225,"endTime":55235,
     "tags":[
             "2"
      ]
    } ,

    {
     "id":"52a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":"46",
     "endTime":"56",
     "tags":[
       "1"
      ]
   }
 ]
},

{
 "_id":"55a50e8f8a9233a1b4f84f88",
 "title":"Video about learning",
 "description":"Learn all about your future",
 "duration":12345,
 "author":"John Doe",
 "path":"videocontent/video2.mp4",
 "annotations":[
    {
     "id":"55a7a50cf5fe9d10b6f3b75b",
     "text":"Text drugi",
     "dateCreated":"2014-12-02T23:00:00.000Z",
     "startTime":55550,"endTime":90000,
     "tags":[
             "3"
      ]
    } ,

    {
     "id":"55a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":20,
     "endTime":"22",
     "tags":[
       "0"
      ]
   }
 ]
},

{
 "_id":"55a20e8f8a9463a1b4f84f88",
 "title":"Video about learning",
 "description":"Learn all about your future",
 "duration":12345,
 "author":"John Doe",
 "path":"videocontent/video3.mp4",
 "annotations":[
    {
     "id":"55a7a50cf5fe9d10b6f3b75b",
     "text":"Text neki",
     "dateCreated":"2014-12-02T23:00:00.000Z",
     "startTime":55545,"endTime":90000,
     "tags":[
             "3"
      ]
    } ,

    {
     "id":"55a8b493852f4a2809482514",
     "text":"asdad",
     "dateCreated":"2015-07-17T07:53:55.137Z",
     "startTime":10,
     "endTime":"13",
     "tags":[
       "2"
      ]
   }
 ]
}
];

    this.getVideos = function(){
	     return $http.get("/videos").success(function(data){
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
	
	this.getVidList = function(){
		return this.vidList;
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
    $http.post('/annotation/'+ vidID +'/add', postBody).
		success(function(data, status, headers, config) {
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