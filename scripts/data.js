define(function(require, exports, module) {
	require('jquery');
	var data = {};
	//以防在没加载完就开始滚动
//	data.isActive = false;

	//作品页长图补全
	data.galleryLeft = 0;
	data.workComple = function() {
		//不能使用offset().left
		while($('#gallery').width() + data.galleryLeft < $(window).width()) {
			
			var img = new Image();
			img.src = 'images/gallery.jpg';
			$('#gallery').append(img);
		}
	}
 	var eventYear = ['00', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
	//var eventList = [];
	data.changing = false;
	data.block = {
		'default': 0,
		'introduction': 0,
		'group': 0,
		'join': 0,
		'event': 0,
		'works': 0
	};

	data.exeHandler = {
		'default': 
			function(param) {
				var block = data.block['default'];
				$('.mainBlock:eq(' + param.loca + ')').css('display','block');
				for (var i = 0; i < 5; i++) {
					var a = i;
					if (a < param.loca)
						$('.mainBlock:eq(' + a + ')').animate({'top': '-100%'},500,function() {
							if(a != 4) return;
							$('.mainBlock:eq(' + block + ')').css('display','none');
							data.changing = false;
						});
					else
						$('.mainBlock:eq(' + a + ')').animate({'top': '0%'},500,function() {
							if(a != 4) return ;
							$('.mainBlock:eq(' + block + ')').css('display','none');
							data.changing = false;
						});
				}
				if(param.loca != 5) $('.navList[val=' + param.loca + ']').attr('isselected', 'true');
				if(data.block['default'] !=5) $('.navList[val=' + data.block['default'] + ']').attr('isselected', 'false');	
				
			},
		'introduction':
			function(param) {
				if(param.loca == 1) {
					$('#intrImgCon>div').attr('aspect','f');
				} else {
					$('#intrImgCon>div').attr('aspect','z');
				}
				$('.intrDot[val=' + param.loca + ']').attr('check', 'true');
				$('.intrDot[val=' + data.block['introduction'] + ']').attr('check', 'false');

				$('.intrCon[value=' + data.block['introduction'] + ']').css('opacity',0);
				$('.intrCon[value=' + param.loca + ']').css('opacity',1);
			},
		'join':
			function(param) {
				$('#joinCon').animate({'top':'-'+param.loca+'00%'},function() {
					data.changing = false;
				});
				$('.joinDot[val=' + param.loca + ']').attr('check', 'true');
				$('.joinDot[val=' + data.block['join'] + ']').attr('check', 'false');
			},
		'group': 
			function(param) {
				$('#groupImgContainer').css('top', '-' + param.loca + '00%');			
				$('.dot[val=' + param.loca + ']').attr('check', 'true');
				$('.dot[val=' + data.block['group'] + ']').attr('check', 'false');

				$('.groupNameImg[value=' + data.block['group'] + ']').css('opacity',0);
				$('.groupNameImg[value=' + param.loca + ']').css('opacity',1);

				$('#intrContent>span[value=' + data.block['group'] + ']').css('opacity',0);
				$('#intrContent>span[value=' + param.loca + ']').css('opacity',1);
			},
		'event':
			function(param) {
					console.log('ee'+data.block['event']);
				var firstDir, thirdDir, next, pre, center = $('.time[value=center]'), dir;
				if(param.loca > data.block['event']) 
					dir = 'up';
				else
					dir = 'down';
				if(dir == 'up') {
					next = $('.time[value=bottom]');
					pre = $('.time[value=top]');
					firstDir = '0%';
					thirdDir = '100%';
				} else {
					pre = $('.time[value=bottom]');
					next = $('.time[value=top]');
					firstDir = '100%';
					thirdDir = '0%';

				}
				pre.attr('value',dir=='up'?'bottom':'top');
				pre.css('top', thirdDir);
				$('.eventDot[val=' + param.loca + ']').attr('check', 'true');
				$('.eventDot[val=' + data.block['event'] + ']').attr('check', 'false');
				var current = data.block['event'];
				center.animate({'top': firstDir}, 700, function() {
					center.attr('value', dir=='up'?'top':'bottom');
					console.log(next.children());
					next.children()[1].innerHTML = '20' + eventYear[param.loca];
					
					$('.eventImgCon[val='+current+']').attr('see',0);
					$('.eventImgCon[val='+param.loca+']').attr('see',1);
					setTimeout("$('.eventImgCon[val="+param.loca+"]>div').css('opacity', 1)",10);
					next.animate({'top': '50%'}, 700, function() {
						next.attr('value', 'center');
						data.changing = false;	
					});
				});
				$('.eventImgCon[val='+current+']>div').css('opacity', 0);
			},
		'works': 
			function(param){
				$('#workSecContainer').css('left', '-' + param.loca + '00%');
				$('.worksDot[val=' + param.loca + ']').attr('check', 'true');
				$('.worksDot[val=' + data.block['works'] + ']').attr('check', 'false');	

				data.galleryLeft = -param.loca * 500;
				$('#gallery').css('transform', 'translate('+ data.galleryLeft +'px)');

				$('.worksName[val=' + data.block['works'] + ']').css('opacity',0);
				$('.worksName[val=' + param.loca + ']').css('opacity',1);

				$('#worksIntrCon>p[val=' + data.block['works'] + ']').css('opacity',0);
				$('#worksIntrCon>p[val=' + param.loca + ']').css('opacity',1);

				$('#worksNameCon').width($('.worksName[val=' + param.loca + ']').width() + 20);
				$('.leau').addClass('lea');
				//判断如果出界了,马上增补一张(或多张)
				data.workComple();	
			}
	};

	var isFirst = [true, true, true, true, true, true];
	var previewHandler = {
		'1': function() {

		},

		'3': function() {
		}
	};

	function preview(loca) {

		
	}

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
			if(param.arrow){
				loca += param.arrow;
			} else if(loca == Number(param.target.attr('val'))) {
				loca = 'false';
			} else {
				loca = Number(param.target.attr('val'));
			}
		}
		return loca;
	}

	data.scroll = function (e, param, handler) {
		//param中包括direction, quantity, block, isLoca(是否通过定位点触发), 
		//如果是通过定位点触发的,则必须要包含target($)
		if(data.changing || window.process < 100) return;
		
		
		var loca = locaHandler(e, param);	
		if (loca == 'false') return;

		data.changing = true;
		if(param.block == 'default'){
			preview(loca);
		}

		//判断是第一个或最后一个,只有在不是通过定位点触发的时候才会执行	
		if(param.isLoca == false || param.arrow) {
			if(loca < 0 || loca > param.quantity) {
				if(param.block == 'default' || loca > param.quantity && param.block == 'join') {
					data.changing = false;
					return;
				}
				if(loca < 0) loca = data.block['default'] - 1;
				else if(loca > param.quantity) loca = data.block['default'] + 1;
				$('.mainBlock:eq(' + loca + ')').css('display','block');
				for (var i = 0; i < 5; i++) {
					var block = data.block['default'];
					var a = i;
					if (a < loca)
						$('.mainBlock:eq(' + a + ')').animate({'top': '-100%'},700,function() {
							if(a != 4) return;
							$('.mainBlock:eq(' + block + ')').css('display','none');
							data.changing = false;
						});
					else
						$('.mainBlock:eq(' + a + ')').animate({'top': '0%'},700,function() {
							if(a != 4) return;
							$('.mainBlock:eq(' + block + ')').css('display','none');
							data.changing = false;
						});

				}
				if (loca != 5) $('.navList[val=' + loca + ']').attr('isselected', 'true');
				if (data.block['default'] != 5) $('.navList[val=' + data.block['default'] + ']').attr('isselected', 'false');
				
				data.block['default'] = loca;
				return ;
			}
		}	
		
		param.loca = loca;
		handler(param);

		data.block[param.block] = loca;
	}

	data.scrollFunc = {

		'default': function(e) {
			data.scroll(e, {direction: 'y', quantity: 5,  block: 'default', isLoca:false}, data.exeHandler['default']);
		},				
		'introduction': function(e) {
			data.scroll(e, {direction: 'y', quantity: 1,  block: 'introduction', isLoca:false}, data.exeHandler['introduction']);
		},
		'join': function(e) {
			data.scroll(e, {direction: 'y', quantity: 1,  block: 'join', isLoca:false}, data.exeHandler['join']);
		},
		'group': function(e) {
			data.scroll(e, {direction: 'y',quantity: 5, block: 'group', isLoca:false}, data.exeHandler['group']);
		},
		'works': function(e) {
			data.scroll(e, {direction: 'x', quantity: 8, block: 'works', isLoca:false}, data.exeHandler['works']);
		},		
		'event': function(e) {
			data.scroll(e, {direction: 'y', quantity: 12, block: 'event', isLoca:false}, data.exeHandler['event']);
		},
	};
	data.scrollFuncMapping = ['default', 'introduction', 'group', 'event', 'works', 'join'];
	module.exports = data;
});
