<template>
	<div class="home2">
		<img alt="Vue logo" src="../assets/logo.png" />
		<Component2 msg="Start" />
	</div>
</template>

<script>
// @ is an alias to /src
import { Prop, Component, Vue, Provide } from "vue-property-decorator";
import Component2 from "@/components/Component2.vue";

@Component({
	name: "Home2",
	components: {
		Component2
	}
})
export default class Home2 extends Vue {}
</script>
