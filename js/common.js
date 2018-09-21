var C={
	POST:function (datas,url,func) {
		var classData={};
        // $.support.cros=true;
        $.ajax({
            type:'POST',
            url: url,
            data: datas,
            async: true,
            cache: false,
            dataType: 'json',
            crossDomain:true == !(document.all),
            beforeSend:function(XMLHttpRequest){
                XMLHttpRequest.setRequestHeader('token', sessionStorage.getItem('Entoken'));
                XMLHttpRequest.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                XMLHttpRequest.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
                // console.log(localStorage.getItem('Entoken'));
            },
            success: function (data) {
                    classData = data;
                    
                if(func){
                   
                    func(data);
                }
                if(data.Result==401 || data.Result==417){
                    window.location.href="../../index.html";
                }
    
            },
            error: function (data) {
                classData = data;
            }

        })
        // console.log(classData);
        return classData;
	},
	POSTS:function (datas,url,func) {
    
         
		var classData={};
        $.ajax({
            type: 'POST',
            url: url,
            data: datas,
            async: true,
            cache: false,
            dataType: 'json',
            contentType: 'application/json',
            crossDomain:true == !(document.all),
            beforeSend:function(request){
                request.setRequestHeader('token', sessionStorage.getItem('Entoken'));
                request.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                request.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
            },
            success: function (data) {               
                
                    classData = data;
                
                if(func){
                    func(data);
                }
                if(data.Result==401 || data.Result==417){
                    window.location.href="../../index.html";
                }
       
            },
            error: function (data) {
                if(func){
                    func(data);
                }
                classData = data;
            }

        })
        // console.log(classData);
        return classData;
	},
    GETS:function(datas,url,func){
     	var classData={};
        $.ajax({
            type: 'GET',
            url: url,
            data: datas,
            async: false,
            cache: false,
            dataType: 'json',
            contentType: 'application/json',
            crossDomain:true == !(document.all),
            beforeSend:function(XMLHttpRequest){
                XMLHttpRequest.setRequestHeader('token', sessionStorage.getItem('Entoken'));
                XMLHttpRequest.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                XMLHttpRequest.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
            },
            success: function (data) {
      
                if(func){
                    func(data);
                }
                if(data.Result==401 || data.Result==417){
                    window.location.href="../../index.html";
                }
            },
            error: function (error) {
                // C.load(1);
                // C.layer(1,error.message);
            }
        });
		return classData;
    },
    GET:function(url,func){
        var classData={};
        $.ajax({
            type:'GET',
            url:url,
            // data:data,
            dataType: 'json',
             async: false,
            cache: true,
            contentType: 'application/json',
            crossDomain:true == !(document.all),
            beforeSend:function(XMLHttpRequest){
                XMLHttpRequest.setRequestHeader('token', sessionStorage.getItem('Entoken'));
                XMLHttpRequest.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                XMLHttpRequest.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
            },
            success:function(data){
                classData= data;
                if(func){
                    func(data);
                }
                if(data.Result==401 || data.Result==417){
                    window.location.href="../../index.html";
                }

            },
            error:function(error){
                classData= error;
            }
        })
        return classData;
    },
    resezes:function (num){
        var sizes={};
        sizes.PW=0.025;
        // sizes.W= window.screen.width;
        sizes.W= document.body.clientWidth;
        
        // sizes.H=$(window).width();
        // sizes.CW=$(".cenContent").width();
        // sizes.CW=$(".main").width();
        // var r = document.body.offsetWidth / window.screen.availWidth; 
        // var h = document.body.offsetHeight / window.screen.availHeight; 
        sizes.CW=$(".main").width();
        
        
        // clw= document.body.clientWidth;
        
        // sizes.zoom=(sizes.CW-sizes.PW*2*sizes.CW)/sizes.W;
        // if(num){
        //     console.log(sizes.CW);
        //     sizes.zoom=(sizes.W-sizes.PW*2*sizes.W)/sizes.CW;
        // }else{
        //     console.log(sizes.CW);
        //     sizes.zoom=(sizes.W-sizes.PW*2*sizes.W)/1400;
        // }
        var ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
        console.log(ipad,11111111111,sizes.W);
        if(ipad==true && sizes.W==1024){
            console.log(22222222222);
            sizes.zoom=(sizes.W-sizes.PW*2*sizes.W)/sizes.W;
        }else{
            sizes.zoom=(sizes.W-sizes.PW*2*sizes.W)/1400;
        }    
       
       console.log(ipad);
        
        console.log(sizes.zoom,sizes.CW);
        $(".main").css({ 'transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-ms-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-webkit-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')' });
        sizes.CH=$(".main").height();
        sizes.H= document.body.clientHeight;
        var mainH=sizes.H-82;
        if(mainH<sizes.CH){
            sizes.zoom=(mainH-100)/620;
            $(".main").css({ 'transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-ms-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-webkit-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')' });
        }

    },
    resizes:function (){
        var sizes={};
        sizes.PW=0.025;
        // sizes.W= window.screen.width;
        sizes.W= document.body.clientWidth;
        
        // sizes.H=$(window).width();
        // sizes.CW=$(".cenContent").width();
        // sizes.CW=$(".main").width();
        // var r = document.body.offsetWidth / window.screen.availWidth; 
        // var h = document.body.offsetHeight / window.screen.availHeight; 
        sizes.CW=$(".main").width();
        
        
        // clw= document.body.clientWidth;
        
        // sizes.zoom=(sizes.CW-sizes.PW*2*sizes.CW)/sizes.W;
      
            console.log(22222222222);
            sizes.zoom=(sizes.W-sizes.PW*2*sizes.W)/1400;
      
        
        console.log(sizes.zoom,sizes.CW);
        $(".main").css({ 'transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-ms-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-webkit-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')' });
        sizes.CH=$(".main").height();
        sizes.H= document.body.clientHeight;
        var mainH=sizes.H-82;
        if(mainH<sizes.CH){
            sizes.zoom=(mainH-100)/620;
            $(".main").css({ 'transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-ms-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-webkit-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')' });
        }
    },
    layer:function(num,content){
        var str='';
        switch(num){
            case 1:
                str='<div class="layer"><span style="background-position: -646px -55px"></span><p>'+content+'</p></div>';
                break;
            case 2:
                str='<div class="layer"><span style="background-position: -693px -55px"></span><p>'+content+'</p></div>';
                break;
            case 3:
                str='<div class="layer"><span style="background-position: -789px -55px"></span><p>'+content+'</p></div>';
                break;
            case 4:
                str='<div class="layer"><span style="background-position: -740px -55px"></span><p>'+content+'</p></div>';
                break;
        }
        $(".layerMask").html(str);
        $(".layerMask").show(100);
        setTimeout(function(){
            $(".layerMask").hide(100);
            $(".layerMask").empty();
        },2000);
    },
    comfig:function(content){
        var str='';
        str='<div class="layer"><span style="background-position: -789px -55px"></span>';
        str+='<p class="imfor">'+content+'</p>';
        str+=' <div class="rightSure">确定</div></div>';
        $(".layerMask").html(str);
        $(".layerMask").show(100);
        $(".layerMask").on('click','.rightSure',function(){
             $(".layerMask").hide(100);
            $(".layerMask").empty();
        })
    },
    load:function(num){
        if(num==0){
            console.log('loading');
            $("body .loading").show();
        }else if(num==1){
            $("body .loading").hide();
        }
    },
    rotateImg:function(){
        var boolshow=$('.mainleft').css('display');
        console.log(boolshow);
        if(boolshow=='block' || boolshow=='inline'){
            $('.mainleft').hide();
            $(".mainright").hide();
            $('.maincenter').width('100%');
            $('.homes').find('img').addClass('praCrotate');
            console.log($(this).find('img'));
        }else{
            $('.mainleft').show();
            $(".mainright").show();
            $('.maincenter').width('80%');
            $('.homes').find('img').removeClass('praCrotate');
        }
    }
    
}