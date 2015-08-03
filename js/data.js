define(function(require, exports, module) {
	require('jquery');
	var data = {};
	data.changing = false;
	data.block = {
		'default': 0,
		'group': 0,
		'greatEvent': 0,
		'works': 0
	}
	function scroll(e, param) {
		//param中包括direction, quantity, target($), block
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
				case ((param.direction == 'y')? 40:39) :
					delta = -100;
					break;
				case ((param.direction == 'y')? 38:37) :
					delta = 100;
					break;
				default:
					//如果不这么做,按其他键会导致不触发,但设置了后面内容
					return;
			}
		}

		//判断是第一个或最后一个	
		if(delta > 0 && data.block[param.block] == 0 || delta < 0 && data.block[param.block] == param.quantity) {
			if(param.block == 'default') return;
			param.target = $('#main');
			param.block = 'default';
			param.direction = 'y';
		}

		var topStr = param.target[0].style[((param.direction == 'y')? 'top':'left')].replace('%', '');
		var topNum = Number(topStr) + delta;
		param.target.css(((param.direction == 'y')? 'top':'left'), topNum + '%');
		data.changing = true;
		data.block[param.block] += (delta > 0)? -1:1;
	}
	data.scrollFunc = {
		'default': function(e) {scroll(e, {direction: 'y', quantity: 5, target: $('#main'), block: 'default'})},				
		'works': function(e) {scroll(e, {direction: 'x', quantity: 4, target: $('#workSecContainer'), block: 'works'})},		
	};
	data.scrollFuncMapping = ['default', 'default', 'default', 'default', 'works', 'default'];
	module.exports = data;
});
