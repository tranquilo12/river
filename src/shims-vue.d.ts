declare module "*.vue" {
	import Vue from "vue";
	export default Vue;
}

declare module "cw-sdk-node";

// json-module.d.ts
declare module "assets/cw_config.json" {
	const data: any;
	export default data;
}

declare module "vue-native-websocket";
