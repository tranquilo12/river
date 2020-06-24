<template>
	<div class="hello">
		<button v-on:click="showMe">{{ msg }}</button>
	</div>
</template>

<script lang="ts">
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

	serializeMarketData(marketData: any) {
		// instantiate local vars
		let totalTradesLen = 0;
		const externalID = [];
		const tsArr = [];
		const priceArr = [];
		const amountArr = [];

		// try to get all ducks in line
		try {
			for (const idx in marketData.trades) {
				tsArr.push(marketData.trades[idx].timestamp);
				priceArr.push(marketData.trades[idx].price);
				amountArr.push(marketData.trades[idx].amount);
				externalID.push(marketData.trades[idx].externalID);
				totalTradesLen += 1;
			}
		} catch (e) {
			console.log(e);
		}

		return [
			Array.from({
				length: totalTradesLen
			}).fill([marketData.market.id]),
			Array.from({
				length: totalTradesLen
			}).fill([marketData.market.exchangeID]),
			Array.from({
				length: totalTradesLen
			}).fill([marketData.market.currencyPairID]),
			tsArr,
			priceArr,
			amountArr,
			externalID
		];
	}

	showMe() {
		const client = this.getClient();
		client.onMarketUpdate((marketData: any) => {
			console.log(this.serializeMarketData(marketData));
		});

		client.connect();
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
