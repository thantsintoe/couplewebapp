<template id="nav-template">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="header-section">
		<a class="navbar-brand" href="#"><img src="../assets/images/main_logo.png" alt="Main Logo" /></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">

			<form class="form-inline my-2 my-lg-0">
				<input id="search-box" class="form-control mr-sm-2" type="text" placeholder="Search My Heart" aria-label="Search">
				<!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
			</form>

		<ul class="navbar-nav ml-auto">
			<li class="nav-ite	m active"><router-link to="/" class="nav-link">New Feed</router-link></li>
			<li class="nav-item">
				<router-link to="/about" class="nav-link">
					<svg
					 xmlns="http://www.w3.org/2000/svg"
					 xmlns:xlink="http://www.w3.org/1999/xlink"
					 width="31px" height="30px">
					<path fill-rule="evenodd"  fill="rgb(229, 232, 220)"
					 d="M27.936,16.815 L27.383,16.815 L27.383,21.900 C27.383,22.110 27.252,22.299 27.053,22.374 C26.992,22.397 26.929,22.408 26.867,22.408 C26.724,22.408 26.584,22.350 26.484,22.242 L25.826,21.530 C25.828,21.484 25.833,21.438 25.833,21.392 L25.833,10.642 C25.833,7.638 25.328,6.610 20.703,6.610 L7.751,6.637 C7.751,6.637 7.750,6.637 7.750,6.637 C7.613,6.637 7.482,6.583 7.385,6.488 C7.288,6.393 7.233,6.263 7.233,6.128 L7.233,3.015 C7.233,1.353 8.608,-0.000 10.297,-0.000 L27.937,0.036 C29.626,0.036 31.000,1.388 31.000,3.051 L31.000,13.800 C31.000,15.463 29.626,16.815 27.936,16.815 ZM24.764,10.642 L24.764,21.392 C24.764,23.054 23.390,24.407 21.700,24.407 L12.112,24.407 L7.099,29.834 C6.999,29.941 6.859,30.000 6.717,30.000 C6.654,30.000 6.591,29.989 6.531,29.966 C6.331,29.890 6.200,29.702 6.200,29.491 L6.200,24.407 L3.064,24.407 C1.374,24.407 0.000,23.054 0.000,21.391 L0.000,10.642 C0.000,8.980 1.374,7.627 3.064,7.627 L21.700,7.627 C23.390,7.627 24.764,8.980 24.764,10.642 Z"/>
					</svg>
				</router-link>
			</li>

			<li class="nav-item"><a href="#" class="nav-link"><img id="profile-icon" src="../assets/images/profile_eipar.png" alt="profile picture of Eipar" /></a></li>
			<li class="nav-item active"><a href="#" class="nav-link">{{initialuser.username}}</a></li>

		</ul>

		</div>
	</nav>
</template>

<script>
	export default {
	  data () {
			return {

			}
	  },
	  props: ['initialuser'],
		data: function () {
		  return { user: this.initialuser }
		},
		created : function() {
			console.log(this.initialuser);
		}
	}
</script>


<style>
	#header-section {

	  background-color: rgb(44, 62, 80)!important;
	  height: 58px;

	}

	#header-section > .navbar-brand {
		color: white;
	}

	#search-box {
		background-color: rgb(44, 62, 80);
    border: none;
    outline: none;
    color: #f1f1f1;
	}

	#profile-icon {
		border: 2px solid white;
		width: 30px;
		height: 30px;
		border-radius: 40px;
	}

	.form-inline {
		display: block;
		margin: 0 auto;
	}


</style>
