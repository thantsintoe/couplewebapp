<template>
	<div>
	<div class="post" v-for="(product,index) in products">
		<div class="post-title">
			<div class="post-user">
				<img width="30px" height="30px" v-if="product.author.username === 'Eipar'" src="../assets/images/profile_eipar.png">
				<img width="30px" height="30px" v-else src="../assets/images/profile_koko.png">
				<h2>{{product.author.username}}<span>{{calculateDate(product.postDate)}}</span></h2>

			</div>
			<form id="deleteForm">
				<input type="hidden" ref="postdId" :value="product._id">
				<button role="submit" v-on:click="submitdeleteform(product._id)">Delete</button>
			</form>
		</div>
		<div class="post-description">
			<p>{{product.postDescription}}</p>
		</div>
		<div class="post-photo">
			<img :src="product.postPhoto">
		</div>
		<div class="post-details">
			<div><img src="../assets/images/love_icon.png">3 Love</div>
			<div><img src="../assets/images/comment_icon.png">4 <button class="toggleComment" v-on:click="commentToggle">Comments</button></div>
			<div><img src="../assets/images/share_icon.png"><a class="share-this-post" href="#">Share This Post</a></div>

		</div>


		<div class="commentBox">

			<form class="new-comment-form" :action="'/products/' + product._id + '/comments'" method="post">
			  <input type="text" ref="comment" name="text" class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Write Your Comment">
			  <button type="submit" class="btn btn-primary">Submit</button>
			</form>

			<div class="allComments">
				<div v-for="comment in product.postComment" class="comments">
					<div>
						<img width="30px" height="30px" v-if="comment.author.username === 'Eipar'" src="../assets/images/profile_eipar.png">
						<img width="30px" height="30px" v-else src="../assets/images/profile_koko.png">
					</div>
					<div class="name-comment">

						<h4>{{comment.author.username}}</h4>
						<p>{{comment.text}}</p>
					</div>
					<button class="btn" role="submit" v-on:click="deleteComment(product._id,comment._id,$event)">Delete</button>
				</div>

			</div>

		</div><!-- End of class commentBox -->
	</div> <!-- End of class post -->
	</div>
</template>

<script>
	var moment = require('moment');

	export default {
	  data () {
  		return {
			products : []
  		}
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



		  },
		methods : {
		  submitdeleteform: function (id) {
				// now we have access to the native event
				if (event) event.preventDefault();

				axios.post('/products/' + id,{})
				  .then(function (response) {
					console.log(response);
					router.push("/products")
				  })
				  .catch(function (error) {
					console.log(error);
				  });
		  },
			submitComment: function (id,event) {
				// now we have access to the native event
				if (event) event.preventDefault();

				var uploadData = new FormData();
				uploadData.append("text",this.$refs.text.value);

				console.log(this.$refs.text.value);

				axios.post('/products/' + id + "/comments",uploadData,{})
				  .then(function (response) {
						console.log(response);
						router.push("/")
				  })
				  .catch(function (error) {
					console.log(error);
				  });
		  },
			deleteComment: function (product_id,comment_id,event) {
				// now we have access to the native event
				if (event) event.preventDefault();

				axios.post('/products/' + product_id + "/comments/" + comment_id,{})
				  .then(function (response) {
						console.log(response);
						router.push("/")
				  })
				  .catch(function (error) {
						console.log(error);
				  });
		  },
		  calculateDate: function(date) {

			  return moment(Number(date)).format("MMMM Do YYYY, h:mm:ss a");
		  },
			commentToggle : function(event) {
					var links = document.querySelectorAll(".toggleComment");

					links.forEach(function(link) {
						link.addEventListener("click",function() {
							alert("OK");
						});
					});
				}
	  	}
	}
</script>


<style>
.post {
width: 100%;
background: #fff;
margin-top: 30px;
display: flex;
flex-direction: column;
box-shadow: 0px 3px 6.79px 0.21px rgba(144, 144, 144, 0.3);
border-radius: 5px;
}
.post .post-title {
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 15px;

}

.post > .post-title > .post-user {
display: flex;
flex-direction: row;
}

.post > .post-title > .post-user > img {
width: 40px;
height: 40px;
border: 2px solid #ebe8e1;
border-radius: 40px;
margin-right: 15px;
}


.post > .post-title > .post-user > h2 {
	font-size: 15px;
	font-family: "Muli";
	color: rgb(86, 160, 229);
	font-weight: bold;
	line-height: 2.4;
	text-align: left;
display: flex;
flex-direction: column;
margin-bottom: 0px;
}

.post > .post-title > .post-user > h2 > span {
	font-size: 11px;
	font-family: "Muli";
	color: #aaa;
	font-weight: lighter;

	text-align: left;

}

.post > .post-title button {
border: 1px solid rgb(255, 142, 163);
background-color: rgb(255, 255, 255);
opacity: 0.39;
width: 81px;
height: 34px;
font-size: 10px;
color: #db5271;
}


.post .post-description {
padding: 15px;
font-size: 12px;
font-weight: 400;
color: #5c5c5c;
}

.post > .post-photo > img {
width: 100%;
}
.post .post-details {
display: flex;
flex-direction: row;
height: 75px;
align-items: center;
padding: 15px;
justify-content: space-around;
font-size: 12px;
color: #5c5c5c;
}

.post > .post-details img {
margin-right: 10px;
}

.toggleComment {
	background: none;
    color: #5f5f5f;
}

.toggleComment:hover {
	background: none;
    color: #5f5f5f;
}

.share-this-post {
	font-size: 14px;
    color: #676767;
}


.commentBox {
	display: flex;
	box-sizing: border-box;
	flex-flow: column;
	padding: 20px;
}

.commentBox .new-comment-form {
	display: flex;
	flex-flow: row nowrap;
}

.commentBox .new-comment-form > input[type="text"] {
	font-size: 12px;
border: 1px solid gainsboro;
}

.commentBox .new-comment-form > .btn-primary {
	width: 100px;
    height: 35px;
    font-size: 12px;
    border-radius: 5px;
    padding: 0px;
    background: #ffaabe;
    border: none;
}

.commentBox .new-comment-form > .btn-primary:hover {
	width: 100px;
    height: 35px;
    font-size: 12px;
    border-radius: 5px;
    padding: 0px;
    background: #ffaabe;
    border: none;
}

.commentBox .allComments {
	margin-top: 20px;
    padding-top: 15px;
}

.commentBox .allComments h4 {
	font-size: 15px;
    color: rgb(86, 160, 229);
    font-family: "muli";
}

.commentBox .allComments p {
	font-size: 13px;
    color: gray;
}

.comments {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	margin-bottom: 20px;
}

.comments img {
	width: 40px;
    height: 40px;
    border: 2px solid #ebe8e1;
    border-radius: 40px;
    margin-right: 15px;
}
.name-comment {
	display: inline-block;
    position: absolute;
    left: 80px;
}
.comments .btn {
	padding: 4px;
    font-size: 10px;
    height: 25px;
    border-radius: 0px;
    background: #fff;
    border: 1px solid #ff8ea3;
    color: #ff8ea3;
}

</style>
