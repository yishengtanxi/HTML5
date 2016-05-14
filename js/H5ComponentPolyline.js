/* 柱图组件对象 */
var H5ComponentPolyline=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	//绘制网格线
	var w=cfg.width;
	var h=cfg.height;
	//加入画布-背景层
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	cns.width=ctx.width=w;
	cns.height=ctx.height=h;
	var step=10;
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle="#9e9e9e";
	window.ctx=ctx;
	for(var i=0;i<step+1;i++){
		var y=(h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//垂直网格线，根据项目个数去分
	step=cfg.data.length+1;
	var text_w=Math.floor(w/step);
	for(var i=0;i<step+1;i++){
		var x=w/step*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
            var text=$('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width',text_w/2).css('left',x/2+text_w/4);
            component.append(text);
		}
	}
	ctx.stroke();
	component.append(cns);
	//加入画布-数据层
	var cns=document.createElement('canvas');
	var ctx=cns.getContext('2d');
	var draw=function(per){


		cns.width=ctx.width=w;
		cns.height=ctx.height=h;
		ctx.clearRect(0,0,w,h);
		//绘制折线数据
	    ctx.beginPath();
	    ctx.lineWidth=4;
	    ctx.strokeStyle='#ff8878';
	    var x=0;
	    var y=0;
	    var row_w=(w/(cfg.data.length+1));
	    //画点
	    for(var i=0;i<cfg.data.length;i++){
	    	var item=cfg.data[i];
	    	x=row_w*(i+1);
	    	y=h*(1-(item[1]*per));
	        ctx.moveTo(x+5,y);
	        ctx.arc(x,y,2,0,2*Math.PI);
	    }
	    //连线
	    ctx.moveTo(row_w,h*(1-cfg.data[0][1]*per));
	    for(var i=0;i<cfg.data.length;i++){
	    	var item=cfg.data[i];
	    	x=row_w*(i+1);
	    	y=h*(1-(item[1]*per));
	    	ctx.lineTo(x,y);
	    }
	    ctx.stroke();
	    //绘制阴影
	    ctx.lineWidth=1;
	    ctx.lineTo(x,h);
	    ctx.lineTo(row_w,h);
	    ctx.fillStyle='rgba(255,136,120,0.2)';
	    ctx.fill();
	    //写数据
	    for(var i=0;i<cfg.data.length;i++){
	    	var item=cfg.data[i];
	    	x=row_w*(i+1);
	    	y=h*(1-(item[1]*per));
	    	ctx.fillStyle=item[2]?item[2]:"#595959";
	        ctx.fillText((item[1]*100)+'%',x-10,y-10);
	    }

	    ctx.stroke();
	};

	component.on('onLoad',function(){
		var s=0;
		for(i=0;i<100;i++){
			setTimeout(function(){
                s+=.01;
                draw(s);
			},i*10+500)
		}
	})
	component.on('onLeave',function(){
		var s=1;
		for(i=0;i<100;i++){
			setTimeout(function(){
                s-=.01;
                draw(s);
			},i*10+500)
		}
	})

    component.append(cns);
    return component;
}
