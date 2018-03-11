<template>
	<div>
		<div v-for="(product,index) in products">
			<single-post :product="product"></single-post>
		</div>
	</div>
</template>

<script>
	let moment = require('moment');
	import SinglePost from './SinglePost.vue';

	export default {
	  data () {
  		return {
				products : []
			}
	  },
		components: {
			SinglePost
	  },
		created() {
			axios.get("/api/products")
			.then(response => {
			  this.products = response.data;

			})
			.catch(e => {
			  this.errors.push(e)
			})
		  },
		updated() {
				axios.get("/api/products")
				.then(response => {
				  this.products = response.data;

				})
				.catch(e => {
				  this.errors.push(e)
				});

		  }

	}
</script>


<style>


</style>
