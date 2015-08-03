define(function(require, exports, module) {
	require('jquery');
	var data = {};
	data.block = 0;
	data.workBlock = 0;
	data.changing = false;
	data.scrollFunc = {
		'default': function(e) {
						if(data.changing) return;
						var delta;
						if(e.originalEvent.wheelDelta) {
							if(e.originalEvent.wheelDelta > 0) {
								delta = 100;
							} else {
								delta = -100;
							}
						} else if(e.originalEvent.detail) {
							if(e.originalEvent.detail > 0) {
								delta = -100;
							} else {
								delta = 100;
							}
						} else {
							switch(e.which){
								case 40:
									delta = -100;
									break;
								case 38:
									delta = 100;
							}
						}
						//判断是第一个或最后一个
						if (delta < 0 && data.block == 5 || delta > 0 && data.block == 0) return;
						var topStr = $('#main')[0].style.top.replace('%', '');
						var topNum = Number(topStr) +delta;
						$('#main').css('top', topNum + '%');
						data.changing = true;
						data.block += (delta > 0)? -1:1;
					},
					
		'works': function(e) {
					if(data.changing) return;
					var delta;
					if(e.originalEvent.wheelDelta) {
						if(e.originalEvent.wheelDelta > 0) {
							delta = 100;
						} else {
							delta = -100;
						}
					} else if(e.originalEvent.detail) {
						if(e.originalEvent.detail > 0) {
							delta = -100;
						} else {
							delta = 100;
						}
					} else {
						switch(e.which){
							case 39:
								delta = -100;
								break;
							case 37:
								delta = 100;
						}
					}
					//判断是第一个或最后一个
					if (delta < 0 && data.workBlock == 4 || delta > 0 && data.workBlock == 0) return;
					var topStr = $('#workSecContainer')[0].style.left.replace('%', '');
					var topNum = Number(topStr) +delta;
					$('#workSecContainer').css('left', topNum + '%');
					data.changing = true;
					//$(this).attr('block', Number($(this).attr('block')) + (delta > 0)? -1:1);
					data.workBlock += (delta > 0)? -1:1;
				},
	};
	data.scrollFuncMapping = ['default', 'default', 'default', 'default', 'works', 'default'];
	module.exports = data;
});
