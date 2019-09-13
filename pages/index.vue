<template>
	<div class="container">
		<div>
			<img :src="siteInfo.icon" :alt="`${siteInfo.name} icon`" class="icon" />
			<h1 class="title">{{siteInfo.name}}</h1>
			<h2 class="subtitle">{{siteInfo.description}}</h2>
			<div class="links">
				<a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
				<a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ params, app, payload, route, store }) {
		let info = await import("~/content/setup/config.json");
		return {
			siteInfo: info
		};
	}
};
</script>

<style>
.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
		"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.icon {
	max-width: 250px;
	width: 100%;
	margin: 0 auto;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>
