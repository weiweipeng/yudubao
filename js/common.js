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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // if(func){
                //     func(data);
                // }
                console.log(XMLHttpRequest, textStatus, errorThrown);
                // classData = data;
            }

        })
        // console.log(classData);
        // return classData;
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
  
        sizes.W= document.body.clientWidth;
        
        sizes.CW=$(".main").width();

         sizes.CH=$(".main").height();
        sizes.H= document.body.clientHeight;
        var mainH=sizes.H-82;
        var ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
       
        if(ipad==true && sizes.W==1024){
           
            sizes.zoomX=(sizes.W-sizes.PW*2*sizes.W)/sizes.W;
        }else{
            if(sizes.W>1400){
                sizes.zoomX=(sizes.W-sizes.PW*2*sizes.W)/1400;
            }else{
                sizes.zoomX=(sizes.W-sizes.PW*2*sizes.W)/sizes.W;
            }
        } 
        sizes.zoomY=(mainH-70)/620;
        $(".main").css({ 'transform': 'scale(' + sizes.zoomX + ','+sizes.zoomY +')', '-ms-transform': 'scale(' + sizes.zoomX + ','+sizes.zoomY +')', '-webkit-transform': 'scale(' + sizes.zoomX + ','+sizes.zoomY +')' });
    },
    resizes:function (){
        var sizes={};
        sizes.PW=0.025;
  
        sizes.W= document.body.clientWidth;
        
        sizes.CW=$(".main").width();

         sizes.CH=$(".main").height();
        sizes.H= document.body.clientHeight;
        var mainH=sizes.H-22;
        var ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
       
        if(ipad==true && sizes.W==1024){
           
            sizes.zoomX=(sizes.W-sizes.PW*2*sizes.W)/sizes.W;
        }else{
            if(sizes.W>1400){
                sizes.zoomX=(sizes.W-sizes.PW*2*sizes.W)/1400;
            }else{
                sizes.zoomX=(sizes.W-sizes.PW*2*sizes.W)/sizes.W;
            }
        } 

        sizes.zoomY=mainH/610;
        
        $(".main").css({ 'transform': 'scale(' + sizes.zoomX + ','+sizes.zoomY +')', '-ms-transform': 'scale(' + sizes.zoomX + ','+sizes.zoomY +')', '-webkit-transform': 'scale(' + sizes.zoomX + ','+sizes.zoomY +')' });
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
    comfig:function(content,event){
        var str='';
        str='<div class="layer"><span style="background-position: -789px -55px"></span>';
        str+='<p class="imfor">'+content+'</p>';
        str+=' <div class="comfigBtnline"><div class="rightSures comfigBtn">确定</div></div>';
        $(".layerMask").html(str);
        $(".layerMask").show(100);
        $(".layerMask").on('click','.rightSures',function(){
            $(".layerMask").hide(100);
            $(".layerMask").empty();
            if(event=='reload'){
                location.reload();
            }else if(event == 'check'){
                $('.tablelist').find('input').attr('checked',false);
            }
        })
    },
    comfigs:function(content,func){
        var bool=false;
        var str='';
        str='<div class="layer"><span style="background-position: -789px -55px"></span>';
        str+='<p class="imfor">'+content+'</p>';
        str+=' <div class="comfigBtnline"><div class="rightSure comfigBtn">确定</div>';
        str+=' <div class="cancleSure comfigBtn">取消</div></div></div>';
        $(".layerMask").html(str);
        $(".layerMask").show(100);
        $('.cancleSure').on('click',function(){
            $(".layerMask").hide(100);
            $(".layerMask").empty();
        });
        $(".layerMask").on('click','.rightSure',function(){
            $(".layerMask").hide(100);
            $(".layerMask").empty();
            func();
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
    },
    leftPage:function(param,count,func){
        if(param.IndexPage>1){
            count=-1;
            var leftnum=parseInt(param.IndexPage)+count;
            param.IndexPage=leftnum;
            func();
        }else{
            param.IndexPage=1;
            C.layer(2,"已经是第一页啦！");
        }
    },
    rightPage:function(param,count,allCount,func){
        if(param.IndexPage<allCount){
            count=1;
            var rightnum=parseInt(param.IndexPage)+count;
            param.IndexPage=rightnum;
            func();
        }else{
            param.IndexPage=allCount;
            C.layer(2,"已经是最后一页啦！");
        }
    },
    toggleImg:function(_this){
        var boolToggle=$(_this).next().css('display');
        console.log(111111111111,$(_this).next());
        if(boolToggle == "block" || boolToggle == "inline"){
            $(_this).find('.addContentImg ').show();
            $(_this).find('.reduceContentImg ').hide();
            $(_this).next().hide('slow');
        }else{
            console.log($(_this).find('.addContentImg '));
            $(_this).find('.addContentImg ').hide();
            $(_this).find('.reduceContentImg ').show();
            $(_this).next().show('slow');
        }
    },
    top:function(){
        console.log(2222222);
        // $('#form1').scrollTop(0);
        // document.getElementById('form1').scrollTop=0;
    }
    
}
function IsNormal(str) {
    if (str == undefined || str == 'undefined' || str == '' || str == null || str == "null") {
        return false;
    } else {
        return true;
    }
}
