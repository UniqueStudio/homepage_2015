seajs.config({
	base: "",
	alias: {
	"jquery": "scripts/jquery.js",
	}
});
// 加载入口模块
seajs.use("./scripts/m");
