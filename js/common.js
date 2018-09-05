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
                XMLHttpRequest.setRequestHeader('token', localStorage.getItem('Entoken'));
                XMLHttpRequest.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                XMLHttpRequest.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
                // console.log(localStorage.getItem('Entoken'));
            },
            success: function (data) {
                    classData = data;
                    
                if(func){
                   
                    func(data);
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
                request.setRequestHeader('token', localStorage.getItem('Entoken'));
                request.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                request.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
            },
            success: function (data) {               
                
                    classData = data;
                
                if(func){
                    func(data);
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
                XMLHttpRequest.setRequestHeader('token', localStorage.getItem('Entoken'));
                XMLHttpRequest.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                XMLHttpRequest.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
            },
            success: function (data) {
      
                if(func){
                    func(data);
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
                XMLHttpRequest.setRequestHeader('token', localStorage.getItem('Entoken'));
                XMLHttpRequest.setRequestHeader('timestamp', Math.round(new Date() / 1000));
                XMLHttpRequest.setRequestHeader('deviceID', localStorage.getItem('deviceID'));
            },
            success:function(data){
                classData= data;
                if(func){
                    func(data);
                }

            },
            error:function(error){
                classData= error;
            }
        })
        return classData;
    },
    resezes:function (){
        var sizes={};
        sizes.PW=0.025;
        sizes.W= window.screen.width;
        sizes.CW=$(".cenContent").width();
        sizes.zoom=(sizes.CW-sizes.PW*2*sizes.CW)/sizes.W;
        $(".main").css({ 'transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-ms-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-webkit-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')' });
    },
    resizes:function (){
        var sizes={};
        sizes.PW=0.025;
        sizes.H=$(window).height();
        sizes.W= window.screen.width;
        sizes.OW=sizes.W-sizes.W*sizes.PW*2;
        sizes.OH=sizes.H-220;

        sizes.CW=$(".cenContent").width();
        sizes.CH=$(".cenContent").height();
        var mainW=$(".main").width();
        var mainH=$(".main").height();
        sizes.zoom=sizes.OH/mainH;
        if(mainW*sizes.zoom>sizes.OW){
            sizes.zoom=sizes.OW/mainW;
        }
        $(".main").css({ 'transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-ms-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')', '-webkit-transform': 'scale(' + sizes.zoom + ','+sizes.zoom +')' });
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
    }
    
}