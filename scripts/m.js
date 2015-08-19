/**
 *
 * Created by mingtao on 15-7-28.
 */
define(function(require) {
	require('jquery');
	var Data = require('./data');
	//为所有的透明图绑定事件，鼠标悬停：彩图出现，该图的形状变为彩图形状
	$('.hoverImgHandle').bind('mouseover', function() {
		var imgID = this.id.replace(/Handle/, '');
		$('#' + imgID).css('display', 'block');

	});
	$('.hoverImg').bind('mouseout', function(){
		$(this).css('display','none');
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
		if($('#nav').attr('ischanging') == 'true') return;	
		$('#nav').css(
			'transform','translate(0,0)',
			'-o-transform','translate(0,0)',
			'-moz-transform','translate(0,0)',
			'-ms-transform','translate(0,0)',
			'-webkit-transform','translate(0,0)'
		);
		$('#nav').attr('ischanging', 'true');
		$(this).css('display','none');
	});

	$('#nav').bind('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', function(e) {
		$(this).attr('ischanging', 'false');
	});

	$('#menuInNav').bind('click', function() {
		if($('#nav').attr('ischanging') == 'true') return;	
		$('#nav').css(
			'transform','translate(0,-100%)',
			'-o-transform','translate(0,-100%)',
			'-moz-transform','translate(0,-100%)',
			'-ms-transform','translate(0,-100%)',
			'-webkit-transform','translate(0,-100%)'
		);
		$('#nav').attr('ischanging', 'true');
		$('#menu').css('display','block');
	});

	$(window).bind('mousewheel DOMMouseScroll keydown', function(e) {
		var funcName = Data.scrollFuncMapping[Data.block['default']];

		Data.scrollFunc[funcName](e);
	});
	
	//绑定渐变结束事件,重新激活绑定的事件
	$('#main, .mainBlock, #groupImgContainer').bind('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', function(e) {
		Data.changing = false;
	});
	$('#cover').bind('transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd', function(e) {
		$(this).css('display','none');
		$('#wave').css('display','none');
	});
	$('.leau').bind('webkitAnimationEnd animationend', function() {
		$(this).removeClass('lea');
	});

	$('.navList').bind('click', function(e) {
		var This = $(this);
		Data.scroll(e, {target: This, direction: 'y', quantity: 5,  block: 'default', isLoca:true}, Data.exeHandler['default']);
	});
	
	$('.dot').bind('click', function(e) {		
		var This = $(this);
		Data.scroll(e, {target: This, quantity: 5, block: 'group', isLoca:true}, Data.exeHandler['group']);
	});

	$('.worksDot').bind('click', function(e) {		
		var This = $(this);
		Data.scroll(e, {target: This, quantity: 4, block: 'works', isLoca:true}, Data.exeHandler['works']);
	});

	$('.intrDot').bind('click', function(e) {		
		var This = $(this);
		Data.scroll(e, {target: This, quantity: 1, block: 'introduction', isLoca:true}, Data.exeHandler['introduction']);
	});
	$('.eventDot').bind('click', function(e) {		
		var This = $(this);
		Data.scroll(e, {target: This, quantity: 4, block: 'event', isLoca:true}, Data.exeHandler['event']);
	});

	$('.joinDot').bind('click', function(e) {		
		var This = $(this);
		Data.scroll(e, {target:This, quantity: 1,  block: 'join', isLoca:true}, Data.exeHandler['join']);
	});

	$('.groupArrow').bind('click', function(e){
		var value = Number($(this).attr('val'));

		Data.scroll(e, {arrow:value,direction: 'y',quantity: 5, block: 'group', isLoca:true}, Data.exeHandler['group']);
	});

	$('.worksArrow').bind('click', function(e){
		var value = Number($(this).attr('val'));
		Data.scroll(e, {arrow:value,direction: 'x',quantity: 4, block: 'works', isLoca:true}, Data.exeHandler['works']);
	});
	//----------------介绍部分开始----------------
	$('#intrImgCon').height($('#intrImgCon').width() * 1.8);	
	//大事记页面的自适应也是相同操作
	$('#eventImgCon').height($('#eventImgCon').width() / 1.8);
	$(window).resize(function() {
		$('#intrImgCon').height($('#intrImgCon').width() * 1.8);	
		$('#eventImgCon').height($('#eventImgCon').width() / 1.8);
		Data.workComple();
	});
	//----------------介绍部分结束----------------
	//测试用
	
	$(document).ready(function() {
//		$('#cover').css('opacity',0);
//		$('#load2Container').css('top','29%');
//		clearInterval(window.wave);
//		Data.isActive = true;
		Data.workComple();
	});	
	
});
