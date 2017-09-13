<template>
	<div class="chat">
        <div class="chat__sidebar">
            <h3>People</h3>
            <div id="users">{{author.username}}</div>
        </div>
        <div class="chat__main">
            <ol id="messages" class="chat__messages">
								<li v-for="message in messages">
									<div class="message-info">
										{{message.author.username}} {{moment(message.createdAt).format("h:mm a")}}
									</div>
									<div class="message-text">{{message.text}}<div>
								</li>
            </ol>
            <div class="chat__footer">
                <form id="message-form">
                    <input type="text" name="message" id="message-input" placeholder="Type Your Message Here" autofocus autocomplete="off">
										<input type="hidden" name="message-user-id" :value="author._id">
										<input type="hidden" name="message-user-name" :value="author.username">
										<button role="submit">Send Message</button>
                </form>
                <button id="send-location">Send Location</button>
            </div>

        </div>
    </div>
</template>

<script>

	var moment = require('moment');
	export default {
	  data () {
			return {
				author: {},
				messages: [],
				moment : moment
			}
	  },
		created : function() {

		  var self = this;

			// Get current user
		  axios.get('/currentuser',{})
		  .then(function (response) {
			  self.author = response.data.user;
				console.log("Author is " + self.author);
		  })
		  .catch(function (error) {
			console.log(error);
		  });


			// Get previous messages

			axios.get("/api/messages")
			.then(response => {
				self.messages = response.data;

			})
			.catch(e => {
				self.errors.push(e)
			});
	  }
	}
</script>


<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
	font-weight: 300;
	font-size: .95rem;
}

ul, li {
	list-style-position: inside;
}

h3 {
	font-weight: 600;
	text-align: center;
	font-size: 1.5rem;
}

button {
		border: none;
		background: #ffbab0;
		border-radius: 5px;
		color: white;
		cursor: pointer;
		padding: 10px;
		transition: background .3s ease;
}

button:hover {
	border: none;
	background: #ec9184;
	color: white;
	padding: 10px;
}

button:disabled {
	cursor: default;
	background: #698ea5;
}

.centered-form {
	display: flex;
	align-items: center;
	height: calc(100vh-52px);
	width: 100vw;
	justify-content: center;
	background: -moz-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ff3.6+ */
	background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(49,84,129,1)), color-stop(100%, rgba(39,107,130,1))); /* safari4+,chrome */
	background: -webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* safari5.1+,chrome10+ */
	background: -o-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* opera 11.10+ */
	background: -ms-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ie10+ */
	background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
}

.centered-form__form {
	background: rgba(250, 250, 250, 0.9);
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	padding: 0px 20px;
	margin: 20px;
	width: 230px;
}

.form-field {
	margin: 20px 0;
}

.form-field > * {
	width: 100%;
}

.form-field label {
	display: block;
	margin-bottom: 7px;
}

.form-field input, .form-field select {
	border: 1px solid #e1e1e1;
	padding: 10px;
}

.chat {
	display: flex;
	overflow: hidden;
		height: calc(100vh - 52px);
}

.chat__sidebar {
	overflow-y: scroll;
	width: 260px;
	height: calc(100vh-52px);
	background: -moz-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ff3.6+ */
	background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(49,84,129,1)), color-stop(100%, rgba(39,107,130,1))); /* safari4+,chrome */
	background: -webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* safari5.1+,chrome10+ */
	background: -o-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* opera 11.10+ */
	background: -ms-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ie10+ */
	background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
}

.chat__sidebar h3 {
	color: #e6eaee;
	margin: 10px 20px;
	text-align: left;
}

.chat__sidebar ul {
	list-style-type: none;
}

.chat__sidebar li {
	background: #e6eaee;
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	padding: 10px;
	margin: 10px;
}

.chat__main {
	display: flex;
	flex-direction: column;
	height:  calc(100vh - 52px);
	width: 100%;
}

.chat__messages {
	flex-grow: 1;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}

.chat__footer {
	background: #e6eaee;
	display: flex;
	padding: 10px;
	/*height: 60px;*/
	flex-shrink: 0;
}

.chat__footer form {
	flex-grow: 1;
	display: flex;
}

.chat__footer form * {
	margin-right: 10px;
}

.chat__footer input {
		border: none;
		padding: 10px;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		font-family: "Muli";
		font-size: 13px;
		outline: none;
		border-radius: 5px;
}

.chat__messages {
	list-style-type: none;
	padding: 10px;
}

.chat__messages > li {
	list-style-type: none;
	padding: 10px;
}

.message {
	padding: 10px;
}

.message__title {
	display: flex;
	margin-bottom: 5px;
}

.message__title h4 {
	font-weight: 600;
	margin-right: 10px;
}

.message__title span {
	color: #999;
}

@media (max-width: 600px) {
	* {
		font-size: 1rem;
	}

	.chat__sidebar {
		display: none;
	}

	.chat__footer {
		flex-direction: column;
	}

	.chat__footer form {
		margin-bottom: 10px;
	}

	.chat__footer button {
		margin-right: 0px;
	}


}
/*end of media queries*/

#messages li {
	padding: 10px;
	background: rgb(225, 232, 232);
	margin: 0px;
	margin-bottom: 15px;
	border-radius: 5px;
	font-size: 14px;
	font-weight: 300;
	font-family: "Muli";
	color: #4c6d8d;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}

#message .message-text {
	color: #166bab;
  font-weight: 400;
}

#message .message-info {
	color: gray;
  font-weight: 300;
}

.chat__sidebar #users {
	color: white;
    padding-left: 20px;
    margin-top: 20px;
    font-size: 18px;
}

</style>
