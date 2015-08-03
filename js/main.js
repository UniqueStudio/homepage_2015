/**
 *
 * Created by mingtao on 15-7-28.
 */
define(function(require) {
	require('jquery');
	require('base');
	$(document).ready(function() {
	//为所有的透明图绑定事件，鼠标悬停：彩图出现，该图的形状变为彩图形状
		(function () {
			$('.hoverImgHandle').bind('mouseover', function() {
				var imgID = this.id.replace(/Handle/, '');
				$('#' + imgID).css('display', 'block');

			});
			$('.hoverImg').bind('mouseout', function(){
				$(this).css('display','none');
			})
		})();
	});

	//为处理一个bug,暂不知道出现的原因.由于只有在调整页面才会出现该bug,加载时不会,所以放到最后
	/*window.addEventListener('resize', function(){
		var html = document.getElementsByTagName('html')[0];
		if(html.offsetWidth/html.offsetHeight < 16/9) {
			var width = html.offsetHeight *16/9 +'px';
			document.getElementById('hoverImgContainer').style.width = width;
			document.getElementById('bgImg').style.width = width;
		}
		else {
			document.getElementById('hoverImgContainer').style.width = '100%';
			document.getElementById('bgImg').style.width = '100%';
		}
	});*/
	$('#menu').bind('click', function() {
		if($(this).attr('status') && $(this).attr('status') == 'unfolded') {
			$(this).css('transform', 'rotate(0deg)');
			$(this).attr('status', 'folded');
			$('#nav').css('width', '32px');
		} else {
			$(this).css('transform', 'rotate(1800deg)');
			$(this).attr('status', 'unfolded');
			$('#nav').css('width', '525px');
		}
	});
	$(window).bind('mousewheel DOMMouseScroll keydown', function(e) {
		if($('#main').attr('transforming') == 'true') return;
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
		if (delta < 0 && Global.block == 5 || delta > 0 && Global.block == 0) return;
		var topStr = $('#main')[0].style.top.replace('%', '');
		var topNum = Number(topStr) +delta;
		$('#main').css('top', topNum + '%');
		$('#main').attr('transforming', 'true');
		Global.block += (delta > 0)? -1:1;
	});
	//绑定渐变结束事件,重新激活绑定的事件
	$('#main').bind('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', function(e) {
		$(this).attr('transforming', 'false');
	});


	//测试用
	$('body')[0].onload = function() {
		$('#cover').css('opacity',0);
		$('#load2Container').css('top','29%');
		clearInterval(window.wave);
	}
});
