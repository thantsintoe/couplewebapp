
<template>
  <div id="app">
    <!-- <img src="assets/images/home.png" alt="" /> -->
	  <navigation :initialuser="user"></navigation>
	  <router-view></router-view>
  </div>
</template>



<script>
	import Navigation from './components/Navigation.vue'

	export default {
	  data () {
		return {
		  msg: 'Hello from vue-loader!',
		  user: {}
		}
	  },
	  name : "app",
	  components: {
		    Navigation
	  },
	  created : function() {
		  
		  var self = this;
		  
		
		  
		  axios.get('/currentuser',{})
		  .then(function (response) {
			  self.user = response.data.user;
			  
			  console.log(self.user.username);
//			  console.log(response.data);

		  })
		  .catch(function (error) {
			console.log(error);
		  });
	  }
	}
</script>




<style>
	#app {
	  background: #edeeee;
	}
</style>
