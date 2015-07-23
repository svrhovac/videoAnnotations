spa.filter("filterByTags", function(){
    return function(a, ts){
        if(typeof ts === 'undefined'){
            return a;
        }
        console.log("krece filter");
        console.log(a);
        console.log(ts);
        for(i=0;i<ts.length; i++){//provjerava da li je bar jedan checkBox selektovan
            if(ts[i].boxValue == true)
                break;
            if(i == ts.length-1)
                return a;
        }

        var filtered = [];
        for(i=0; i<a.length; i++){//prolazi kroz listu anotacija
            //console.log("anotacija["+i+"]:");
            //console.log(a[i])
            for(j=0, noAnno=false; j<ts.length; j++){//prolazi kroz listu predefinisanih tagova
                //console.log("pred_tag["+j+"]:");
                //console.log(ts[j]);
                if(ts[j].boxValue){//ako je checkiran box
                    //console.log("cekiran je box");
                    for(k=0; k<a[i].tags.length; k++){//prolazi kroz listu tagova u anotaciji
                        //console.log("=="+ts[j]._id+"=="+a[i].tags[k]);
                        if(ts[j]._id == a[i].tags[k]){//postoji tag u annotaciji
                            //console.log("nasao je tag u anno");
                            break;
                        }
                        if(k==a[i].tags.length-1){//nije pronasao tag u anotaciji
                            //console.log("nije nasao tag u anno");
                            noAnno = true;
                        }
                    }
                }
                if(noAnno){//naisao je na tag koji ne postoji u anno
                    //console.log("naisao je na tag koji ne postoji u anno");
                    break;
                }
                if(j == ts.length-1){//prosao kroz sve tagove i svi se nalaze u anno
                    //console.log("svi tagovi postoje u anno");
                    filtered.push(a[i]);
                }
            }
        }
        console.log(filtered);
        return filtered;
    };
});