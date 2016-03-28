/**
 * Created by mingtao on 16-3-28.
 */
var Data = require('./data').data;
var $ = require('./data').$;
(function(){
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
})();
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
$(document).on('click', '#menu', function() {
	var nav = $('#nav');
	if(nav.attr('ischanging') == 'true') return;
	nav.css(
		'transform','translate(0,0)',
		'-o-transform','translate(0,0)',
		'-moz-transform','translate(0,0)',
		'-ms-transform','translate(0,0)',
		'-webkit-transform','translate(0,0)'
	);
	nav.attr('ischanging', 'true');
	$(this).css('display','none',
		'-webkit-animation-play-state','paused',
		'animation-play-state','paused'
	);
});

$(document).on('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', '#nav', function(e) {
	$(this).attr('ischanging', 'false');
});

$(document).on('click', '#menuInNav', function() {
	var nav = $('#nav');
	if(nav.attr('ischanging') == 'true') return;
	nav.css(
		'transform','translate(0,-100%)',
		'-o-transform','translate(0,-100%)',
		'-moz-transform','translate(0,-100%)',
		'-ms-transform','translate(0,-100%)',
		'-webkit-transform','translate(0,-100%)'
	);
	nav.attr('ischanging', 'true');
	$('#menu').css('display','block',
		'-webkit-animation-play-state','running',
		'animation-play-state','running'
	);
});

$(window).on('mousewheel DOMMouseScroll keydown', function(e) {
	var funcName = Data.scrollFuncMapping[Data.block['default']];
	Data.scrollFunc[funcName](e);
});

//绑定渐变结束事件,重新激活绑定的事件
$(document).on('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', '.intrCon, #groupImgContainer, #workSecContainer',function(e) {
	Data.changing = false;
});
$(document).on('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', '#cover',function(e) {
	$(this).css('display','none');
	$('#wave').css('display','none');
});
$(document).on('webkitAnimationEnd animationend', '.leau', function() {
	$(this).removeClass('lea');
});

var dotFuncMapping = {
	'defaultDot':[5, 'default'],
	'dot':[5, 'group'],
	'worksDot':[8, 'works'],
	'intrDot':[1, 'introduction'],
	'eventDot':[12, 'event'],
	'joinDot':[1, 'join']
};

$('.Dot').on('click', function(e) {
	var arr = ['defaultDot', 'dot', 'worksDot', 'intrDot', 'eventDot', 'joinDot'];
	var This = $(this);
	for(var i in arr) {
		var className = arr[i];
		if(This.hasClass(className)) {
			var obj = dotFuncMapping[className];
			Data.scroll(e, {target: This, quantity:obj[0],  block: obj[1], isLoca:true}, Data.exeHandler[obj[1]]);
			break;
		}
	}
});

$('.groupArrow').bind('click', function(e){
	var value = Number($(this).attr('val'));

	Data.scroll(e, {arrow:value,direction: 'y',quantity: 5, block: 'group', isLoca:true}, Data.exeHandler['group']);
});

$('.worksArrow').bind('click', function(e){
	var value = Number($(this).attr('val'));
	Data.scroll(e, {arrow:value,direction: 'x',quantity: 9, block: 'works', isLoca:true}, Data.exeHandler['works']);
});

$(window).resize(function() {
	try{
		window.preview[$('.mainBlock[active=1]').attr('val')]();
	} catch(e){}
});

$('#submit2').click(function() {
	$.post('/advice',{
		name:$('#name2').val(),
		major: $('#major2').val(),
		email: $('#email2').val(),
		advice: $('#advice2').val()
	}).done(function(r) {
		if(r.length == 0){
			alert('信息成功提交');
		} else {
			alert('信息错误');
		}
	});
});

