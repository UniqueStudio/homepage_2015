/**
 * Created by Mingtao Fu on 2015/7/28.
 */
(function(){
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=b_version.split(";");
	try {
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(browser=="Microsoft Internet Explorer"&&trim_Version.match(/MSIE[6789].0/) || trim_Version.match(/Chrome\/[123]/)) {
			window.location.href="recommend.html";
		}
	} catch (e) {
		console.warn(e);
	}
	var a={android:0,ipad:0,iphone:0,ipod:0,wp:0};
	var b=window.navigator.userAgent.toLowerCase();
	a.android=/android/i.test(b);
	a.ipad=/ipad/i.test(b);
	a.iphone=/iphone/i.test(b);
	a.ipod=/ipod/i.test(b);
	a.wp=/windows/i.test(b)&&/phone/i.test(b);
	if(a.android||a.ipad||a.iphone||a.wp) {
		if (window.location.href.indexOf("#apply") != -1) {
			hash = "#apply";
		}
		else {
			hash = "";
		}
		window.location.href="http://m.hustunique.com/" + hash;
	}
})();
