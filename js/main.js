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
