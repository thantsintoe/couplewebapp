<template>
	<div id="cover-photo">
    <img src="../assets/images/cover_eipar.png" alt="Eipar's Cover Photo" />
    <div class="alert alert-secondary" role="alert">
      Welcome Back Eipar
    </div>
	</div>
</template>

<script>

	export default {
	  data () {
  		return {

  		}
	  }
	}
</script>


<style>
	#cover-photo {

	}

  #cover-photo > img {
		width: 100%;
    object-fit: cover;
    height: 300px;
    border: 2px solid #ff8ea3;
  }

  #cover-photo > .alert-secondary {
    width: 100%;
    margin: 20px auto;
    padding: 15px;
    background-color: white;
    border-radius: 5px;
    font-family: "Muli";
    font-size: 15px;
    font-weight: 200;
    color: #ff8ea3;
  }


</style>
