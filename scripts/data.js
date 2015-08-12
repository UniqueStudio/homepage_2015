define(function(require, exports, module) {
	require('jquery');
	var data = {};
	//以防在没加载完就开始滚动
	data.isActive = false;

	//作品页长图补全
	data.galleryLeft = 0;
	data.workComple = function() {
		//不能使用offset().left
		//var galleryWidth = $('#gallery').width();
		//var sectionWidth = $('#works').width();
		console.log('gallery='+$('#gallery').width()+',left='+data.galleryLeft +',window='+$(window).width());
		while($('#gallery').width() + data.galleryLeft < $(window).width()) {
			
			var img = new Image();
			img.src = 'images/gallery.jpg';
			$('#gallery').append(img);
		}
	}

	data.changing = false;
	data.block = {
		'default': 0,
		'group': 0,
		'greatEvent': 0,
		'works': 0
	};

	data.exeHandler = {
		'default': 
			function(param){
				$('#main').css('top', '-' + param.loca + '00%');	
				$('.navList[value=' + param.loca + ']').attr('isselected', 'true');
				$('.navList[value=' + data.block['default'] + ']').attr('isselected', 'false');	
			},
		'group': 
			function(param) {
				/*
				var value = ( param.loca - param.quantity) / (param.quantity + 1) * 100;
				$('#groupImgContainer').css('transform', 'translate('+value+'%,0)');
				$('.groupImg[value=' + data.block['group'] + ']').css('opacity' ,0);
				$('.groupImg[value=' + param.loca + ']').css('opacity' ,1);

				var value_title = (-0.5 - param.loca ) / (param.quantity + 1) * 100;
				$('#groupMoveContainer').css('transform', 'translate('+value_title+'%,0)');	
				$('.groupNameContainer[value=' + data.block['group'] + ']').css('opacity' ,0);
				$('.groupNameContainer[value=' + param.loca + ']').css('opacity' ,1);	
				*/

				$('#groupImgContainer').css('top', '-' + param.loca + '00%');	
				/*
				$('.dot[value=' + data.block['group'] + ']').html('&#xe603');
				$('.dot[value=' + param.loca + ']').html('&#xe604');
				*/
				
				$('.dot[value=' + param.loca + ']').attr('check', 'true');
				$('.dot[value=' + data.block['group'] + ']').attr('check', 'false');
			},
		'works': 
			function(param){
				$('#workSecContainer').css('left', '-' + param.loca + '00%');
				$('.worksDot[value=' + param.loca + ']').attr('check', 'true');
				$('.worksDot[value=' + data.block['works'] + ']').attr('check', 'false');
				/*
				$('.worksDot[value=' + data.block['works'] + ']').html('&#xe603');
				$('.worksDot[value=' + param.loca + ']').html('&#xe604');
				*/

				data.galleryLeft = -param.loca * 1000;
				$('#gallery').css('transform', 'translate('+ data.galleryLeft +'px)');

				$('.worksName[value=' + data.block['works'] + ']').css('opacity',0);
				$('.worksName[value=' + param.loca + ']').css('opacity',1);

				//判断如果出界了,马上增补一张(或多张)
				data.workComple();	
			}
	};

	function locaHandler(e, param) {
		var loca = data.block[param.block];
		if(param.isLoca == false) {
			if(e.originalEvent.wheelDelta) {
				if(e.originalEvent.wheelDelta > 0) {
					loca -= 1;
				} else {
					loca += 1;
				}
			} else if(e.originalEvent.detail) {
				if(e.originalEvent.detail > 0) {
					loca += 1;
				} else {
					loca -= 1;
				}
			} else {
				switch(e.which){
					case ((param.direction == 'y')? 40:39) :
						loca += 1;
						break;
					case ((param.direction == 'y')? 38:37) :
						loca -= 1;
						break;
					default:
						//如果不这么做,按其他键会导致不触发,但设置了后面内容
						loca = 'false';			//bool的false会与0冲突
				}
			}
		} else {
			console.log('param.arrrow='+param.arrow);
			if(param.arrow){
				loca += param.arrow;
			} else if(loca == Number(param.target.attr('value'))) {
				loca = 'false';
			} else {
				loca = Number(param.target.attr('value'));
			}
		}
		console.log(loca);
		return loca;
	}

	data.scroll = function (e, param, handler) {
		//param中包括direction, quantity, block, isLoca(是否通过定位点触发), 
		//如果是通过定位点触发的,则必须要包含target($)
		if(data.changing || data.isActive == false) return;
		
		console.log(data.block[param.block]);
		
		var loca = locaHandler(e, param);	
		console.log(loca);
		if (loca == 'false') return;

				console.log('www' + loca);

		//判断是第一个或最后一个,只有在不是通过定位点触发的时候才会执行	
		if(param.isLoca == false || param.arrow) {
			if(loca < 0 || loca > param.quantity) {
				if(param.block == 'default') return;
				if(loca < 0) loca = data.block['default'] - 1;
				else if(loca > param.quantity) loca = data.block['default'] + 1;
				//loca = Math.min(Math.max(loca ,0), param.quantity);
				/*
				var topStr = $('#main')[0].style['top'].replace('%', '');
				var topNum = Number(topStr) + delta * 100;
				*/
				$('#main').css('top', '-' + loca + '00%');
				$('.navList[value=' + loca + ']').attr('isselected', 'true');
				$('.navList[value=' + data.block['default'] + ']').attr('isselected', 'false');
				data.changing = true;
				data.block['default'] = loca;
				return ;
			}
		}	
		
		param.loca = loca;
		handler(param);

		data.changing = true;
		data.block[param.block] = loca;
	}

	data.scrollFunc = {

		'default': function(e) {
			data.scroll(e, {direction: 'y', quantity: 5,  block: 'default', isLoca:false}, data.exeHandler['default']);
		},				
		'group': function(e) {
			data.scroll(e, {direction: 'y',quantity: 5, block: 'group', isLoca:false}, data.exeHandler['group']);
		},
		'works': function(e) {
			data.scroll(e, {direction: 'x', quantity: 4, block: 'works', isLoca:false}, data.exeHandler['works']);
		},		
	};
	data.scrollFuncMapping = ['default', 'default', 'group', 'default', 'works', 'default'];
	module.exports = data;
});
