
spa.controller("videoController", function($scope, $location, $http, $routeParams, $timeout, videoService){
	$scope.showListStatus = false;
    $scope.showAnno = false;
	$scope.idVideo = $routeParams.id;
	console.log($routeParams.id)

	//$scope.vidList = videoService.getVidList();
	console.log($scope.vidList);
	$scope.tags = [];
	$scope.allAnnotations = [];
	$scope.liveAnno = [];
	$scope.showLiveAnno = false;

	/*==============================================================*/

	//$scope.vidList = videoService.getVideos();

	videoService.getVideos().success(function(data){
		$scope.vidList = data;
		console.log("lsita videa");
		console.log($scope.vidList);
	});
	//$scope.video = videoService.getVideoProperty($scope.idVideo);

	videoService.getVideoProperty($scope.idVideo).success(function(data){
		$scope.video = data;
		console.log($scope.video);
	});

	videoService.loadTags().success(function(data){
		$scope.tags = data;
		for(i=0; i<$scope.tags.length; i++){
			$scope.tags[i].boxValue = false;
		}
	});

	/*================================================================*/
	

	$scope.videoDomObj = document.getElementById("videoDOM");
	console.log($scope.videoDomObj.currentTime);
	console.log($routeParams.anno_time);
	all:
	for(i=0;i<$scope.vidList.length;i++){
		for(j=0;j<$scope.vidList[i].annotations.length;j++){
			if($scope.vidList[i].annotations[j].id == $routeParams.anno_id){
					$scope.videoDomObj.currentTime = $scope.vidList[i].annotations[j].startTime;
				break all;
			}
		}

	}
	$scope.videoDomObj.ontimeupdate = function() {$scope.checkAnno()};

	//$scope.loadAnnotation(videoService.getCAnno());
	//console.log($scope.video.path);



	



	$scope.showList = function(x){
		$scope.showListStatus = x;
	};

	$scope.loadAllAnnotations = function(){
		if($scope.allAnnotations.length != 0)
			return;
		for(i = 0; i<$scope.vidList.length; i++){
			for(j=0; j<$scope.vidList[i].annotations.length; j++){
				//for(k=0; k<$scope.allAnnotations)//#############################################################################################################
				$scope.allAnnotations.push($scope.vidList[i].annotations[j]);
			}
		}
	};

	$scope.goToVidAnno = function(a){
		var x;
		for(i=0; i<$scope.vidList.length; i++){
			for(j=0; j<$scope.vidList[i].annotations.length; j++){
				if($scope.vidList[i].annotations[j].id == a.id){
					videoService.setCurrAnno($scope.vidList[i].annotations[j].id);
					x = $scope.vidList[i]._id;
					console.log("=============================================");
					console.log($scope.vidList[i].annotations[j].text);
				}
			}
		}
		console.log(x);
		$location.path("/video/" + x);
		//console.log("izvrseno je ok");
	};

	$scope.cloneAnno = function(orig){
		var copy = {};
		copy.id = orig.id;
		copy.text = orig.text;
		copy.dateCreated = orig.dateCreated;
		copy.startTime = orig.startTime;
		copy.endTime = orig.endTime;
		copy.tags = [];
		for(i=0; i<orig.tags.length; i++){
			copy.tags[i] = orig.tags[i];
		}
		return copy;
	}

	$scope.switchValue = function(t){
		t.boxValue = !t.boxValue;
	};

	$scope.switchTag = function(i){
		if($scope.tags[i].val){
			$scope.tags[i].val = false;
			document.getElementsByClassName("tag-list")[i].style.background = "#e65454";
		}
		else{
			$scope.tags[i].val = true;
			document.getElementsByClassName("tag-list")[i].style.background = "#00fe3e";
		}
		console.log($scope.tags);
	}

	var annoID;
	$scope.editAnnotation = function(anno){
		$scope.showAnno = true;
		annoID = anno.id;
		document.getElementById("anno-edit-left").value = anno.text;
		document.getElementById("time-start").value = anno.startTime;
		document.getElementById("time-end").value = anno.endTime;

		var tagList = document.getElementsByClassName("tag-list");
		for(i=0; i<$scope.tags.length; i++){
			for(j=0; j<anno.tags.length; j++){
				console.log("i: "+i+" j: "+j);
				console.log(anno.tags[j]);
				console.log($scope.tags[i]._id);
				if(anno.tags[j] == $scope.tags[i]._id){
					console.log("zeleno");
					console.log(tagList[i]);
					tagList[i].style.background = "#00fe3e";
					$scope.tags[i].val=true;
					break;
				}
				else if(j==anno.tags.length-1){
					console.log("crveno");
					tagList[i].style.background = "#e65454";
					$scope.tags[i].val=false;
				}
			}
		}

		console.log(tagList);
	};

	$scope.createNewAnnotation = function(){
		$scope.showAnno = true;
		annoID = -1;
		$scope.videoDomObj.pause();
		document.getElementById("anno-edit-left").value = "";
		document.getElementById("time-start").value = Math.floor($scope.videoDomObj.currentTime);
		document.getElementById("time-end").value = "";

		document.getElementById("anno-edit-left").placeholder = "Enter description...";
		document.getElementById("time-start").placeholder = "hh:mm:ss";
		document.getElementById("time-end").placeholder = "hh:mm:ss";

		var tagList = document.getElementsByClassName("tag-list");
		for(i=0; i<$scope.tags.length; i++){
			tagList[i].style.background = "#e65454";
			$scope.tags[i].val = false;
		}
	};

	$scope.consoleTags = function(){
		console.log("**************************");
		console.log($scope.tags);
		console.log("**************************");
	};

	$scope.formatTime = function(t){
	    //var t = parseInt(t, 10); // don't forget the second param
	    var hours   = Math.floor(t / 3600);
	    var minutes = Math.floor((t - (hours * 3600)) / 60);
	    var seconds = t - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {if(hours > 0)hours = "0"+hours+":";else hours = ""}
	    if (minutes < 10) {if(minutes > 0)minutes = "0"+minutes+":";else minutes = ""}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = hours+minutes+seconds;
	    return time;
	};

	$scope.saveAnnotation = function(){
		var newAnnotation;
		var valid = true;
		if(annoID < 0){
			newAnnotation = {};
		}
		else{
			for(i=0; i<$scope.video.annotations.length; i++){
				console.log("i: "+i+$scope.video.annotations[i].id+"==="+annoID);
				if($scope.video.annotations[i].id == annoID)
					newAnnotation = $scope.video.annotations[i];//odje mora da je problem ################################################################################
			}
		}
		console.log("valid: "+valid);
		strStart = document.getElementById("time-start").value;
		strEnd = document.getElementById("time-end").value;

		if(parseInt(strEnd) < parseInt(strStart)){
			document.getElementById("time-end").value = "";
			document.getElementById("time-end").placeholder = "invalid!";
			valid = false;
		}
		if(strStart == ""){
			document.getElementById("time-start").placeholder = "required!";
			valid = false;
		}
		if(strEnd == ""){
			document.getElementById("time-end").placeholder = "required!";
			valid = false;
		}
		timeFormat = /[0-9][0-9]?(:|\s)[0-9][0-9]?(:|\s)[0-9][0-9]?/;
		timeFormat2 = /[0-9][0-9]?(:|\s)[0-9][0-9]?/;
		timeFormat3 = /[0-9][0-9]?/;
		finalStartTime = 0;
		finalEndTime = 0;
		console.log(strStart.search(timeFormat) +" "+strStart.search(timeFormat2) +" "+strStart.search(timeFormat3));
		strArr = [];
		console.log("valid: "+valid);
		if(strStart.search(timeFormat)==0 ||
			strStart.search(timeFormat2)==0 ||
			strStart.search(timeFormat3)==0){
			console.log("prvi ispunjava uslove");
			strStart = strStart.replace(/\s/,":");
			strArr = strStart.split(":");
			for(i=strArr.length-1, mod=1, finalStartTime=0; i>=0; mod*=60, i--){
				x = parseInt(strArr[i]);
				if((i==2) && (x>60 || x<0)){
					document.getElementById("time-start").value = "";
					document.getElementById("time-start").placeholder = "invalid!";
					valid = false;
				}
				else if((i==1) && (x>60 || x<0)){
					document.getElementById("time-start").value = "";
					document.getElementById("time-start").placeholder = "invalid!";
					valid = false;
				}
				finalStartTime += x * mod;
				console.log("i,mod,finalST: "+i+", "+mod+" "+finalStartTime);
			}
		}
		else{
			document.getElementById("time-start").value = "";
			document.getElementById("time-start").placeholder = "invalid!";
			valid = false;
		}
		console.log("valid: "+valid);
		if(strEnd.search(timeFormat)==0 ||
			strStart.search(timeFormat2)==0 ||
			strStart.search(timeFormat3)==0){
			strEnd = strEnd.replace(/\s/,":");
			strArr = strEnd.split(":");
			for(i=strArr.length-1, mod=1, finalEndTime=0; i>=0; mod*=60, i--){
				x = parseInt(strArr[i]);
				if((i==2) && (x>60 || x<0)){
					document.getElementById("time-end").value = "";
					document.getElementById("time-end").placeholder = "invalid!";
					valid = false;
				}
				if((i==1) && (x>60 || x<0)){
					document.getElementById("time-end").value = "";
					document.getElementById("time-end").placeholder = "invalid!";
					valid = false;
				}
				finalEndTime += x * mod;
			}
		}
		else{
			document.getElementById("time-end").value = "";
			document.getElementById("time-end").placeholder = "invalid!";
			valid = false;
		}
		console.log("valid "+valid);
		if(valid == false)
			return;
		newAnnotation.startTime = finalStartTime;
		newAnnotation.endTime = finalEndTime;
		newAnnotation.text = document.getElementById("anno-edit-left").value;

		newAnnotation.tags = [];
		for(i=0; i<$scope.tags.length; i++){
			if($scope.tags[i].val)
				newAnnotation.tags.push($scope.tags[i]._id);
		}

		if(annoID < 0){
			videoService.sendNewAnnoToServer(newAnnotation, $scope.video._id).success(function(data){
				//call server saljem newAnnotation i video._id
				$scope.video.annotations.push(data);
			});
		}
		else{
			videoService.sendAnnotationToServer(newAnnotation, $scope.video._id);
			//call server saljem newAnnotation i video._id
			/*for(i=0; i<$scope.vidList.length; i++){//jako zahtjevna operacija a nije neophodna, live update anotacije
				for(j=0; j<$scope.vidList[i].annotations.length; j++){
					if($scope.vidList[i].annotations[j].id == newAnnotation.id){
						$scope.vidList[i].annotations[j] = newAnnotation;
					}
				}
			}*/
		}																		

		$scope.showAnno = false;
		console.log(newAnnotation);
	};

	$scope.deleteAnnotation = function(a){
		var x = 0;
		console.log("del anno");
		for(i=0; i<$scope.video.annotations.length; i++){
			console.log("i: "+i);
			console.log("poredi "+$scope.video.annotations[i].id+" sa "+a.id);
			if($scope.video.annotations[i].id == a.id){
				console.log("pronasao ano na poz: "+i);
				console.log($scope.video.annotations);
				console.log(a);
				x = i;
				break;
			}
		}

		videoService.deleteAnnoFromServer(a,$scope.video._id);
		//ako je success od servera onda
		console.log("prije splice");
		console.log($scope.video.annotations);
		$scope.video.annotations.splice(x,1);
		console.log("poslije splice");
		console.log($scope.video.annotations);
		//ako nije ispisi gresku
	};

	$scope.loadAnnotation = function(a){
		$scope.videoDomObj.currentTime = a.startTime;
	};

	$scope.checkAnno = function(){
		var removed = false;
		$timeout(function(){
			var t = $scope.videoDomObj.currentTime;
			var x;
			console.log("tick: " + t);
			for(i=0; i<$scope.video.annotations.length; i++){
				console.log("start-----------length: "+$scope.liveAnno.length)
				console.log("i: " + i + " x: " + x);
				if(removed){
					i--;
					removed=false;
				}
				x=-1;
				for(j=0; j<$scope.liveAnno.length; j++){
					console.log("poredi: "+$scope.liveAnno[j].id+" sa "+$scope.video.annotations[i].id);
					if($scope.liveAnno[j].id == $scope.video.annotations[i].id){
						x = j;
						console.log("jednaki su pa je x: "+x);
						break;
					}
					else if(j == $scope.liveAnno.length-1){
						console.log("nije pronasao u liveAnno");
						x = -1;
						break;
					}
				}
				//x = $scope.liveAnno.indexOf($scope.video.annotations[i]);
				if(t >= $scope.video.annotations[i].startTime){
					console.log("    postoji anno cije pocetno vrijeme iza");
					if(t < $scope.video.annotations[i].endTime){
						console.log("        postoji anno cije krajnje vrijeme ispred");
						if(x < 0){
							console.log("            taj anno trenutno nije live");

							$scope.liveAnno.push($scope.video.annotations[i]);
							$scope.$apply();

							console.log($scope.liveAnno);
							console.log($scope.video.annotations[i]);
						}
					}
					else if(x > 0 || x==0){
						console.log("izbacuje element");
						console.log($scope.liveAnno);
						console.log($scope.liveAnno[x]);
						$scope.liveAnno.splice(x,1);
						$scope.$apply();
						console.log($scope.liveAnno);
						if(i==0)
							removed = true;
						else
							i--;
					}
				}
				console.log("end-------------");
			}
		}, 1000);
	};
	
	$scope.nextVideo = function(){
       for(i=0; i<$scope.vidList.length; i++){
		   if($scope.vidList[i]._id == $scope.video._id){
			   pos=i;
			   break;
		   }
	   }
       if(pos==$scope.vidList.length - 1)
           pos=0;
       else
           pos++;

	   /*=======================================================*/

	   $location.path("/video/"+$scope.vidList[pos]._id);

	    videoService.getVideoProperty($scope.vidList[pos]._id).success(function(data){
			//$location.path("/video/"+data._id);
			$location.path("/video/"+data._id);
			});
	/*=======================================================*/
   };
   $scope.prevVideo = function(){
       for(i=0; i<$scope.vidList.length; i++){
		   if($scope.vidList[i]._id == $scope.video._id){
			   pos=i;
			   break;
		   }
	   };
       if(pos==0)
           pos=$scope.vidList.length-1;
       else
           pos--;
	   
	    /*=======================================================*/
	    //$location.path("/video/"+$scope.vidList[pos]._id);

	    videoService.getVideoProperty($scope.vidList[pos]._id).success(function(data){
			$location.path("/video/"+data._id);
		});
		/*=======================================================*/
   };

   $scope.changeBackground = function(x){
   		if(x){
   			document.getElementById("anno-view").style.background = "#F75D59";
   			document.getElementById("vid-view").style.background = "#E5E4E2";
   		}
   		else{
   			document.getElementById("vid-view").style.background = "#F75D59";
   			document.getElementById("anno-view").style.background = "#E5E4E2";
   		}
   };

   $scope.changeBackground2 = function(x){
   		if(x){
   			document.getElementById("all-anno-view").style.background = "#F75D59";
   			document.getElementById("all-vid-view").style.background = "#E5E4E2";
   		}
   		else{
   			document.getElementById("all-vid-view").style.background = "#F75D59";
   			document.getElementById("all-anno-view").style.background = "#E5E4E2";
   		}
   };
});