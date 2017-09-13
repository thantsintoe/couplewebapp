<template>
	<div id="profile">
			<img src="../assets/images/profile_eipar.png" alt="" />
			<h2>Eipar</h2>
			<ul>
				<li><a class="active" href="">Timeline</a></li>
				<li><a href="">Memories</a></li>
				<li><a href="">About</a></li>
				<li><a href="">Messages</a></li>
				<li><a href="">Photo</a></li>
			</ul>
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
#profile {
	width:100%;
	height: 550px;
	border-radius: 5px;
	background-color: #fff;
	display: flex;
	flex-flow: column nowrap;
	box-shadow: 0px 3px 6.79px 0.21px rgba(144, 144, 144, 0.3);
}

#profile > img {
	border-style: solid;
border-width: 2px;
border-color: rgb(255, 142, 163);
border-radius: 50%;
background-color: rgb(44, 62, 80);
width: 206px;
height: 206px;
margin: 30px auto;
}

#profile > h2 {
	font-size: 29px;
	font-family: "Muli";
	color: rgb(44, 62, 80);
	line-height: 1.241;
	text-align: center;

}

#profile > ul {
	list-style: none;
margin-top: 20px;
padding: 0px;
}

#profile > ul > li {
	padding: 5px;
padding-left: 80px;
font-size: 16px;
font-family: "Muli";
font-weight: 300;
color: #bbb;

}

#profile > ul > li > a {
	color: #bbb;
	padding-left: 20px;

}

#profile > ul > li > a:hover,#profile > ul > li > a.active {
	color: #ff8ea3;
	border-left: 2px solid #ff8ea3;
	text-decoration: none;

}


</style>
