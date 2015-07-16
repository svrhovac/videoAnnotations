spa.service("videoServis", ['$http', function($http){
    this.serviceObject = {};
	this.vidList=[];
	
	
   this.currentVideo = {};
   
   this.setServiceObject = function(sObj){
       this.vidList = sObj.vidList;
       this.currentVideo = sObj.currentVideo;
       return this.serviceObject;
   };
   
   this.setVidList = function(data){
	   this.vidList = data;
   };
   
   this.getVidList = function(){
       return this.vidList;
   };
   
   this.setCurrentVideo = function(vid){
	   this.currentVideo = vid;
	    
   };
   
   this.getVideoProperty = function(pin){
       //return this.currentVideo;
	   console.log(pin);
	   console.log(this.vidList);
	    var request="/videos/" + pin;
	   
	    return $http.get(request).success(function(data){
			return data;
		}).
		error(function(data){
			console.log("greska!!!");
		});
    };
   
   this.goToNextVideo = function(){
       var pos=this.vidList.indexOf(this.currentVideo);
       if(pos==this.vidList.length - 1)
           pos=0;
       else
           pos++;
       this.currentVideo = $scope.getVideo[pos];
   };
   
   this.goToPrevVideo = function(){
       var pos=this.vidList.indexOf(this.currentVideo);
       if(pos==0)
           pos=this.vidList.length - 1;
       else
           pos--;
       this.currentVideo = this.vidList[pos];
   };
}]);