// import VueSocketio from "vue-socket.io";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Vue.use(VueSocketio, `//${window.location.host}`);
Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
