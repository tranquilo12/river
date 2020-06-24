<template>
	<div class="hello">
		<button v-on:click="showMe">{{ msg }}</button>
	</div>
</template>

<script lang="ts">
import "setimmediate";
// import VueNativeSock from "vue-native-websocket";
import * as config from "../assets/cw_config.json";
import { Component, Prop, Vue } from "vue-property-decorator";
import { StreamClient } from "cw-sdk-node";

@Component
export default class Component2 extends Vue {
	@Prop() private msg!: string;

	getClient() {
		const streamClient = new StreamClient({
			creds: {
				apiKey: config["pub"],
				secretKey: config["secret"]
			},
			subscriptions: ["markets:*:trades"],
			logLevel: "debug"
		});

		return streamClient;
	}

	isEmpty(obj: any) {
		return Object.keys(obj).length === 0;
	}

	// setNewConnect(StreamClient: any) {}

	serializeMarketData(marketData: any) {
		const finalArr = [];

		if (this.isEmpty(marketData)) {
			console.log("marketData is Empty...");
		} else {
			try {
				for (const idx in marketData.trades) {
					finalArr.push({
						marketID: marketData.market.id,
						exchangeID: marketData.market.exchangeID,
						currencyPairID: marketData.market.currencyPairID,
						externalID: marketData.trades[idx].externalID,
						timestamp: marketData.trades[idx].timestamp.toJson(),
						side: marketData.trades[idx].side,
						price: marketData.trades[idx].price,
						amount: marketData.trades[idx].amount
					});
				}
			} catch (e) {
				console.log(e);
			}
		}
		return finalArr;
	}

	showMe() {
		const client = this.getClient();

		client.onMarketUpdate((marketData: any) => {
			console.log(this.serializeMarketData(marketData));
		});

		client.connect2();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
