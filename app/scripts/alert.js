/**
 * Created by mingtao on 16-3-28.
 */

var $ = require('./jquery');
var ele = document.createElement('div');

ele.id = "wechat";
var styleEle = document.createElement('style');
var style = "\
    #wechat{\
    position:fixed;top:100%;height:100%;width:100%;opacity:0;z-index:100;\
    -webkit-transition:opacity 0.5s,top 0.5s;\
    -o-transition:opacity 0.5s,top 0.5s;\
    -ms-transition:opacity 0.5s,top 0.5s;\
    -moz-transition:opacity 0.5s,top 0.5s;\
    transition:opacity 0.5s,top 0.5s;\
    }\
    #wechat.show{\
    top: 0;opacity:1\
    }\
    #wechatCode{\
    position: relative;left:50%;top:50%;\
    -webkit-transform: translate(-50%,-50%);\
    -moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);\
    -o-transform: translate(-50%,-50%);transform: translate(-50%,-50%);' \
    }\
";
var innerHTML = "<img id='wechatCode' src='images/wechat.png' alt='二维码'>";
ele.innerHTML = innerHTML;
styleEle.innerHTML = style;
document.body.appendChild(styleEle);
document.body.appendChild(ele);
$(wechatBtn).on('click', function () {
   $(ele).addClass('show');
});
$(ele).on('click', function () {
    $(ele).removeClass('show');
});
