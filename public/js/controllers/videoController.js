
spa.controller("videoController", function($scope, $location, $http, $routeParams, $timeout, videoService){
	$scope.showListStatus = false;
    $scope.showAnno = false;
    $scope.fType = true;
	$scope.idVideo = $routeParams.id;
	$scope.idAnno = $routeParams.anno_id;
	console.log($scope.idAnno);


	//$scope.vidList = videoService.getVidList();
	$scope.tags = [];
	$scope.annoList = [];
	$scope.liveAnno = [];
	$scope.showLiveAnno = false;
	$scope.annoInEdit = {};
	$scope.placeholder = {};

	/*==============================================================*/

	//$scope.vidList = videoService.getVideos();

	videoService.getVideos().success(function(data){
		$scope.vidList = data;
		$scope.video = $scope.getVideoById($scope.idVideo);
		$scope.initAnnoList();
		all:
		for(i=0;i<$scope.vidList.length;i++){
			for(j=0;j<$scope.vidList[i].annotations.length;j++){
				if($scope.vidList[i].annotations[j].id == $routeParams.anno_id){
					console.log("==========");
					$scope.videoDomObj.currentTime = $scope.vidList[i].annotations[j].startTime;
					break all;
				}
			}
		}
		console.log($scope.vidList);
	});
	//$scope.video = videoService.getVideoProperty($scope.idVideo);

	videoService.getVideoProperty($scope.idVideo).success(function(data){
		$scope.videoPath = data.path;
		console.log(data.path);
	});


	videoService.loadTags().success(function(data){
		$scope.tags = data;
		for(i=0; i<$scope.tags.length; i++){
			$scope.tags[i].boxValue = false;
		}
	});

	/*================================================================*/
	

	$scope.videoDomObj = document.getElementById("videoDOM");
	$scope.videoDomObj.ontimeupdate = function() {$scope.checkAnno()};

	//$scope.loadAnnotation(videoService.getCAnno());
	//console.log($scope.video.path);



	

	$scope.initAnnoList = function(){
		for(i=0; i<vidList.length; i++){
			for(j=0; j<vidList[i].annotations.length; j++){
				$scope.annoList.push($scope.vidList[i].annotations[j]);
			}
		}
		console.log($scope.annoList);
	};

	$scope.showList = function(x){
		$scope.showListStatus = x;
	};

	$scope.calculateRange = function(r){
		return ($scope.video.durration*r)/100;
	}

	$scope.changefType = function(f){
		$scope.fType = f;
	};

	/*$scope.loadAllAnnotations = function(){
		if($scope.allAnnotations.length != 0)
			return;
		for(i = 0; i<$scope.vidList.length; i++){
			for(j=0; j<$scope.vidList[i].annotations.length; j++){
				$scope.allAnnotations.push($scope.vidList[i].annotations[j]);
			}
		}
	};*/

	$scope.goToVidAnno = function(a){
		var x;
		for(i=0; i<$scope.vidList.length; i++){
			for(j=0; j<$scope.vidList[i].annotations.length; j++){
				if($scope.vidList[i].annotations[j].id == a.id){
					videoService.setCurrAnno($scope.vidList[i].annotations[j].id);
					x = $scope.vidList[i]._id;
				}
			}
		}
		$location.path("/video/" + x + "/anno/" + a.id);
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
			document.getElementsByClassName("tag-list")[i].style.background = "#B6B6B4";
		}
		else{
			$scope.tags[i].val = true;
			document.getElementsByClassName("tag-list")[i].style.background = "#F75D59";
		}
	}

	//var annoID;
	$scope.editAnnotation = function(anno){
		$scope.showAnno = true;
		//annoID = anno.id;
		//$scope.annoInEdit = anno;
		$scope.annoInEdit.id = anno.id;
		$scope.annoInEdit.text = anno.text;
		$scope.annoInEdit.startTime = anno.startTime;
		$scope.annoInEdit.endTime = anno.endTime;
		//document.getElementById("anno-edit-left").value = anno.text;
		//document.getElementById("time-start").value = anno.startTime;
		//document.getElementById("time-end").value = anno.endTime;

		var tagList = document.getElementsByClassName("tag-list");
		for(i=0; i<$scope.tags.length; i++){
			for(j=0; j<anno.tags.length; j++){
				if(anno.tags[j] == $scope.tags[i]._id){
					tagList[i].style.background = "#F75D59";

					$scope.tags[i].val=true;
					break;
				}
				else if(j==anno.tags.length-1){
					tagList[i].style.background = "#B6B6B4";

					$scope.tags[i].val=false;
				}
			}
		}

	};

	$scope.createNewAnnotation = function(){
		$scope.showAnno = true;
		//annoID = -1;
		$scope.videoDomObj.pause();

		$scope.annoInEdit.id = -1;
		$scope.annoInEdit.text = "";
		$scope.annoInEdit.startTime = $scope.formatTime(Math.floor($scope.videoDomObj.currentTime));
		$scope.annoInEdit.endTime = "";

		$scope.placeholder.text = "Enter description...";
		$scope.placeholder.startTime = "hh:mm:ss";
		$scope.placeholder.endTime = "hh:mm:ss";
		//document.getElementById("anno-edit-left").value = "";
		//document.getElementById("time-start").value = Math.floor($scope.videoDomObj.currentTime);
		//document.getElementById("time-end").value = "";

		var tagList = document.getElementsByClassName("tag-list");
		for(i=0; i<$scope.tags.length; i++){
			tagList[i].style.background = "#B6B6B4";
			$scope.tags[i].val = false;
		}
	};

	$scope.formatTime = function(t){
	    //var t = parseInt(t, 10); // don't forget the second param
	    var hours   = Math.floor(t / 3600);
	    var minutes = Math.floor((t - (hours * 3600)) / 60);
	    var seconds = t - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {if(hours > 0)hours = "0"+hours+":";else hours = ""}
	    if (minutes < 10) {if(minutes > 0)minutes = "0"+minutes+":";else minutes = ""}
	    if (seconds < 10) {if(hours>0 || minutes>0)seconds = "0"+seconds;}
	    var time    = hours+minutes+seconds;
	    return time;
	};

	$scope.saveAnnotation = function(){
		//var newAnnotation;
		/*if(annoID < 0){
			newAnnotation = {};
		}
		else{
			for(i=0; i<$scope.video.annotations.length; i++){
				if($scope.video.annotations[i].id == annoID)
					newAnnotation = $scope.video.annotations[i];//odje mora da je problem ################################################################################
			}
			for(i=0; i<$scope.vidList.length; i++){
				for(j=0; j<$scope.vidList[i].annotations.length; j++){
					if($scope.vidList[i].annotations[j].id == annoID){
						newAnnotation = $scope.vidList[i].annotations[j];
					}
				}
			}
		}*/
		strStart = $scope.annoInEdit.startTime.toString();
		strEnd = $scope.annoInEdit.endTime.toString();

		if(parseInt(strEnd) < parseInt(strStart)){
			$scope.annoInEdit.endTime = "";
			$scope.placeholder.endTime = "invalid!";
			return;
		}
		if(strStart == ""){
			$scope.annoInEdit.startTime = "";
			$scope.placeholder.startTime = "required";
			return;
		}
		if(strEnd == ""){
			$scope.annoInEdit.endTime = "";
			$scope.placeholder.endTime = "required";
			return;
		}
		timeFormat = /[0-9][0-9]?(:|\s)[0-9][0-9]?(:|\s)[0-9][0-9]?/;
		timeFormat2 = /[0-9][0-9]?(:|\s)[0-9][0-9]?/;
		timeFormat3 = /[0-9][0-9]?/;
		finalStartTime = 0;
		finalEndTime = 0;
		strArr = [];
		if(strStart.search(timeFormat)==0 ||
			strStart.search(timeFormat2)==0 ||
			strStart.search(timeFormat3)==0){
			strStart = strStart.replace(/\s/,":");
			strArr = strStart.split(":");
			for(i=strArr.length-1, mod=1, finalStartTime=0; i>=0; mod*=60, i--){
				x = parseInt(strArr[i]);
				if((i==2) && (x>60 || x<0)){
					$scope.annoInEdit.startTime = "";
					$scope.placeholder.startTime = "invalid!";
					return;
				}
				else if((i==1) && (x>60 || x<0)){
					$scope.annoInEdit.startTime = "";
					$scope.placeholder.startTime = "invalid!";
					return;
				}
				finalStartTime += x * mod;
			}
		}
		else{
			$scope.annoInEdit.startTime = "";
			$scope.placeholder.startTime = "invalid!";
			return;
		}
		if(strEnd.search(timeFormat)==0 ||
			strStart.search(timeFormat2)==0 ||
			strStart.search(timeFormat3)==0){
			strEnd = strEnd.replace(/\s/,":");
			strArr = strEnd.split(":");
			for(i=strArr.length-1, mod=1, finalEndTime=0; i>=0; mod*=60, i--){
				x = parseInt(strArr[i]);
				if((i==2) && (x>60 || x<0)){
					$scope.annoInEdit.endTime = "";
					$scope.placeholder.endTime = "invalid!";
					return;
				}
				if((i==1) && (x>60 || x<0)){
					$scope.annoInEdit.endTime = "";
					$scope.placeholder.endTime = "invalid!";
					return;
				}
				finalEndTime += x * mod;
			}
		}
		else{
			$scope.annoInEdit.endTime = "";
			$scope.placeholder.endTime = "invalid!";
				return;
		}
		/*newAnnotation.startTime = finalStartTime;
		newAnnotation.endTime = finalEndTime;
		newAnnotation.text = document.getElementById("anno-edit-left").value;*/

		$scope.annoInEdit.tags = [];
		for(i=0; i<$scope.tags.length; i++){
			if($scope.tags[i].val)
				$scope.annoInEdit.tags.push($scope.tags[i]._id);
		}

		if($scope.annoInEdit.id < 0){
			delete $scope.annoInEdit.id;
			console.log("saving anno:");
			console.log($scope.annoInEdit);
			videoService.sendNewAnnoToServer($scope.annoInEdit, $scope.video._id).success(function(data){
				//call server saljem newAnnotation i video._id
				//$scope.video.annotations.push(data);
				$scope.annoList.push(data);
				$scope.video.annotations.push(data);
				//ubacit u video listu
			});
		}
		else{
			var vid = $scope.getVideoByAnno($scope.annoInEdit);
			console.log($scope.annoInEdit.id);
			videoService.sendAnnotationToServer($scope.annoInEdit, vid._id);
			for(i=0; i<vid.annotations.length; i++){
				if(vid.annotations[i].id == $scope.annoInEdit.id){
					vid.annotations[i].text = $scope.annoInEdit.text;
					vid.annotations[i].startTime = $scope.annoInEdit.startTime;
					vid.annotations[i].endTime = $scope.annoInEdit.endTime;
					vid.annotations[i].tags = $scope.annoInEdit.tags;
					break;
				}
			}
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
	};

	$scope.deleteAnnotation = function(a){
		var x = 0;
		console.log("delete");
		console.log($scope.annoList);
		for(z=0; z<$scope.annoList.length; z++){
			console.log($scope.annoList[i]);
			if($scope.annoList[z].id == a.id){
				console.log($scope.annoList[i]);
				var vid = $scope.getVideoByAnno($scope.annoList[z]);
				console.log(z);
				for(j=0; j<vid.annotations.length; j++){
					console.log($scope.annoList[z]);
					if(vid.annotations[j].id == $scope.annoList[z].id){
						vid.annotations.splice(j,1);
						break;
					}
				}
				$scope.annoList.splice(z,1);
				videoService.deleteAnnoFromServer(a,vid._id);
				break;
			}
		}
		/*for(i=0; i<$scope.vidList.length; i++){
			for(j=0; j<$scope.vidList[i].annotations.length; j++){
				if($scope.vidList[i].annotations[j].id == a.id){
					$scope.vidList[i].annotations.splice(j,1);
					videoService.deleteAnnoFromServer(a,$scope.vidList[i]._id);
					break all;
				}
			}
		}*/

		//videoService.deleteAnnoFromServer(a,$scope.video._id);
		//ako je success od servera onda

		//$scope.video.annotations.splice(x,1);
		//ako nije ispisi gresku

	};

	$scope.getVideoById = function(id){
		for(i=0; i<$scope.vidList.length; i++){
			if($scope.vidList[i]._id == id)
				return vidList[i];
		}
		return null;
	};

	$scope.getVideoByAnno = function(a){
		for(i=0; i<$scope.vidList.length; i++){
			for(j=0; j<$scope.vidList[i].annotations.length; j++){
				console.log("i:"+i+" j:"+j);
				console.log($scope.vidList[i].annotations[j]);
				console.log(a);
				console.log($scope.vidList[i].annotations[j].id +"=="+ a.id);
				if($scope.vidList[i].annotations[j].id == a.id){
					return $scope.vidList[i];
				}
			}
		}
		return null;
	};

	$scope.loadAnnotation = function(a){
		$scope.videoDomObj.currentTime = a.startTime;
	};

	$scope.checkAnno = function(){
		var removed = false;
		$timeout(function(){
			var t = $scope.videoDomObj.currentTime;
			var x;
			for(i=0; i<$scope.video.annotations.length; i++){
				if(removed){
					i--;
					removed=false;
				}
				x=-1;
				for(j=0; j<$scope.liveAnno.length; j++){
					if($scope.liveAnno[j].id == $scope.video.annotations[i].id){
						x = j;
						break;
					}
					else if(j == $scope.liveAnno.length-1){
						x = -1;
						break;
					}
				}
				//x = $scope.liveAnno.indexOf($scope.video.annotations[i]);
				if(t >= $scope.video.annotations[i].startTime){
					if(t < $scope.video.annotations[i].endTime){
						if(x < 0){
							$scope.liveAnno.push($scope.video.annotations[i]);
							$scope.$apply();
						}
					}
					else if(x > 0 || x==0){
						$scope.liveAnno.splice(x,1);
						$scope.$apply();
						if(i==0)
							removed = true;
						else
							i--;
					}
				}
			}
		}, 1000);
	};
	
	$scope.nextVideo = function(){
       for(i=0; i<$scope.vidList.length; i++){
		   if($scope.vidList[i]._id == $scope.idVideo){
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
		   if($scope.vidList[i]._id == $scope.idVideo){
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