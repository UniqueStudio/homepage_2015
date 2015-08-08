define(function(require, exports, module) {
	require('jquery');
	var data = {};
	//以防在没加载完就开始滚动
	data.isActive = false;

	data.changing = false;
	data.block = {
		'default': 0,
		'group': 0,
		'greatEvent': 0,
		'works': 0
	}

	function scroll(e, param, handler) {
		console.log(data.changing);
		//param中包括direction, quantity, block
		if(data.changing || data.isActive == false) return;
		
		console.log(data.block[param.block]);
		var delta;
		if(e.originalEvent.wheelDelta) {
			if(e.originalEvent.wheelDelta > 0) {
				delta = 1;
			} else {
				delta = -1;
			}
		} else if(e.originalEvent.detail) {
			if(e.originalEvent.detail > 0) {
				delta = -1;
			} else {
				delta = 1;
			}
		} else {
			switch(e.which){
				case ((param.direction == 'y')? 40:39) :
					delta = -1;
					break;
				case ((param.direction == 'y')? 38:37) :
					delta = 1;
					break;
				default:
					//如果不这么做,按其他键会导致不触发,但设置了后面内容
					return;
			}
		}
		console.log(delta);

		//判断是第一个或最后一个	
		if(delta > 0 && data.block[param.block] == 0 || delta < 0 && data.block[param.block] == param.quantity) {
			if(param.block == 'default') return;
			var topStr = $('#main')[0].style['top'].replace('%', '');
			var topNum = Number(topStr) + delta * 100;
			$('#main').css('top', topNum + '%');
			data.changing = true;
			data.block['default'] -= delta;
			return ;
		}
		
		param.delta = delta;
		handler(param);

		data.changing = true;
		data.block[param.block] -= delta;
	}
	data.scrollFunc = {

		'default': function(e) {
			scroll(e, {direction: 'y', quantity: 5,  block: 'default'}, function(param){
				var topStr = $('#main')[0].style['top'].replace('%', '');
				var topNum = Number(topStr) + param.delta * 100;
				$('#main').css('top', topNum + '%');
			});
		},				

		'group': function(e) {
			scroll(e, {quantity: 3, block: 'group'}, function(param) {
				var value = ( - param.delta + data.block['group'] - param.quantity) / (param.quantity + 1) * 100;
				$('#groupImgContainer').css('transform', 'translate('+value+'%,0)');
				$('#groupImgContainer').children()[data.block['group']].style.opacity = 0;
				$('#groupImgContainer').children()[data.block['group'] - param.delta].style.opacity = 1;

				var value_title = (  param.delta - data.block['group']) / (param.quantity + 1) * 100;
				$('#groupMoveContainer').css('transform', 'translate('+value_title+'%,0)');
				$('#groupMoveContainer').children()[data.block['group']].style.opacity = 0;
				$('#groupMoveContainer').children()[data.block['group'] - param.delta].style.opacity = 1;
				
				$('#groupAside').children()[data.block['group'] + 1].innerHTML = '&#xe603';
				$('#groupAside').children()[data.block['group'] + 1 -param.delta].innerHTML = '&#xe604';

			});
		},

		'works': function(e) {
			scroll(e, {direction: 'x', quantity: 4, block: 'works'}, function(param){
				var topStr = $('#workSecContainer')[0].style['left'].replace('%', '');
				var topNum = Number(topStr) + param.delta * 100;
				$('#workSecContainer').css('left', topNum + '%');
			})
		},		
	};
	data.scrollFuncMapping = ['default', 'default', 'group', 'default', 'works', 'default'];
	module.exports = data;
});
