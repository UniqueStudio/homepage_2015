seajs.config({
	base: "",
	alias: {
	"jquery": "./jquery.js",
	}
});
// 加载入口模块
seajs.use("./scripts/m");
