<template>
	<div class="row" id="mainContent">
		<div class="col-md-3" id="profile-section">
			<profile></profile>
		</div>
		<div class="col-md-7" id="middle-section">
			<cover-photo></cover-photo>
			<new-post></new-post>
			<all-post></all-post>
		</div>
		<div class="col-md-2" id="info-section">
			<our-time></our-time>
		</div>
	</div>
</template>



<script>
	import Profile from './Profile.vue'
	import CoverPhoto from './CoverPhoto.vue'
	import NewPost from './NewPost.vue'
	import AllPost from './AllPost.vue'
	import OurTime from './OurTime.vue'

	export default {
	  data () {
		return {

		}
	  },
	  components: {
			Profile,
			OurTime,
			CoverPhoto,
			NewPost,
		  AllPost
	  }
	}
</script>




<style>
	#mainContent {
		width: 1200px;
		margin: 0 auto;
		background: #edeeee;
	}
	#profile-section,#middle-section,#info-section {
		padding: 10px;
		padding-top: 20px;
		box-sizing: border-box;
	}

	#profile-section {

	}

	#middle-section {

	}

	#info-section {

	}

</style>
