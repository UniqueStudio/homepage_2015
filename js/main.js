/**
 *
 * Created by mingtao on 15-7-28.
 */

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
        $('#nav').css('width', '500px');
    }
});
$('#main').bind('mousewheel DOMMouseScroll', function(e) {
	var topStr = this.style.top.replace('%', '');
	var topNum = Number(topStr) -100;
	$(this).css('top', topNum + '%');
});

