<template>
	<form id="new-post-form" action="/products" method="POST" enctype="multipart/form-data">


<!--
	<input class="input" type="text" placeholder="" ref="name" >
	<input type="file" name="image">
	<button class="button is-primary" role="submit" v-on:click="submitform($event)">Create Post</button>
-->


    	<textarea id="new-post-text" class="form-control" rows="3" ref="description">What's on your mind ?</textarea>
		<div class="row" id="post-controls">

				<div class="col-md-3">
					<label for="upfile" class="custom-file-upload">
					    Upload Photo
					</label>
					<input type="file" name="image" id="upfile">
				</div>
				<div class="col-md-3">
					<a href="#">Add Special Event</a>
				</div>
				<div class="col-md-3">
					<a href="#">How You Feeling</a>
				</div>
				<div class="col-md-3">
					<button class="button is-primary" role="submit" v-on:click="submitform($event)">Post</button>
				</div>
		</div>

	</form>
</template>

<script>

	export default {
	  data () {
  		return {

  		}
	  },
	  methods : {
		  submitform: function (event) {
					// now we have access to the native event
					if (event) event.preventDefault()

					var myForm = document.querySelector('#new-post-form');
					var fileInput = document.querySelector("input[type=file]");

					var uploadData = new FormData(myForm);
					uploadData.append("description",this.$refs.description.value);
					uploadData.append("date",Date.now());
					uploadData.append("image",fileInput.files);


					axios.post('/products',uploadData,{})
					  .then(function (response) {
						console.log(response);
						this.$refs.description.value = "";
						document.querySelector("input[type=file]");
						router.push("/products");
					  })
					  .catch(function (error) {
						console.log(error);
					  });
		  },
			getFile : function(){
	        document.getElementById("upfile").click();
					console.log("clicked")
	    }
	  }
	}
</script>


<style>
	#new-post-form {
		width:100%;
		display: block;
		box-shadow: 0px 3px 6.79px 0.21px rgba(144, 144, 144, 0.3);

	}

	#new-post-text {
		border: none;
    border-radius: 5px 5px 0px 0px;
    font-weight: 200;
    font-size: 14px;
    resize: none;
    padding: 20px;
    color: #777;
	}

	#post-controls {
		background: #f6f6f6;
    border-radius: 0px 0px 5px 5px;
    width: 100%;
    min-height: 60px;
    margin: 0px;

	}

	#post-controls .is-primary {
		border-radius: 5px;
	  background-color: rgb(255, 142, 163);
	  width: 111px;
	  height: 40px;
		border: 0px;
		outline: none;
		color: white;
		font-size: 12px;
		font-weight: bold;
		padding: 0px;

	}

	#post-controls > .col-md-3 {
		padding: 12px;
    text-align: center;
    font-size: 11px;
    font-family: "Muli";
    color: rgb(85, 85, 85);
    line-height: 3.273;
	}

	#post-controls > .col-md-3 > a {
		color: #555;
	}

	#post-controls > .col-md-3 > a:hover {
		color:rgb(255, 142, 163);
		text-decoration: none;
	}

	input[type="file"] {
	    display: none;
	}

	.custom-file-upload {
		border: 1px solid #add1f2;
	border-radius: 5px;
	width: 100px;
	display: inline-block;
	padding: 0px;
	cursor: pointer;
	height: 40px;
	font-size: 12px;
	color: #6b9cca;
	margin: 0px;
	text-align: center;
	margin-top: 5px;
	}



</style>
