<template>
	<div id="ourTime">
    <div class="year">
      <span>{{year}}</span> years
    </div>

    <div class="day">
      <span>{{day}}</span> days
    </div>

    <div class="hour">
      <span>{{hour}}</span> hours
    </div>

    <div class="minute">
      <span>{{minute}}</span> min
    </div>

    <div class="second">
      <span>{{second}}</span> seconds
    </div>
	</div>
</template>

<script>

  var moment = require('moment');

  export default {
	  data () {
      return {
        year  : "",
        day  : "",
        hour  : "",
        minute: "",
        second: ""
      }
	  },
    mounted () {
      setInterval(this.updateDateTime, 1000)
    },
    methods: {
      updateDateTime () {
        const start = moment([2010, 9, 14]);
        let now = moment();

        this.year = now.diff(start, 'year');
        this.day = now.diff(start, 'day');
        this.hour = now.diff(start, 'hour');
        this.minute = now.diff(start, 'minute');
        this.second = now.diff(start, 'second');
      }
    }
	}
</script>


<style>
#ourTime {
	width:100%;
	height: 600px;
	border-radius: 5px;
	background-color: #fff;
	display: flex;
	flex-flow: column nowrap;
	box-shadow: 0px 3px 6.79px 0.21px rgba(144, 144, 144, 0.3);
}

#ourTime > div {

	border-style: solid;
	border-width: 2px;
	border-radius: 50%;
	width: 79px;
	height: 79px;
	margin: 20px auto;
	text-align: center;
	color: #cdcdcd;
	font-family: "Muli";
	font-weight: 300;
}

#ourTime > .year {

	border: 2px solid rgba(205, 71, 101, 0.6);
	background: #f06282;
	font-size: 11px;
	color: #cdcdcd;
	padding-top: 18px;

}

#ourTime > .year > span {
	font-size: 20px;
}

#ourTime > .day {

	border: 2px solid rgb(195, 163, 152);
	background: #a1887f;
	font-size: 11px;
	color: #cdcdcd;
	padding-top: 22px;

}

#ourTime > .day > span {
	font-size: 16px;
}

#ourTime > .hour {

	border: 2px solid rgb(32, 117, 191);
	background: #1e88e5;
	font-size: 11px;
	color: #cdcdcd;
	padding-top: 25px;

}

#ourTime > .hour > span {
	font-size: 13px;
}

#ourTime > .minute {

	border: 2px solid rgb(75, 191, 168);
	background: #16a085;
	font-size: 11px;
	color: #cdcdcd;
	padding-top: 27px;

}

#ourTime > .minute > span {
	font-size: 10px;
}

#ourTime > .second {

	border: 2px solid rgb(248, 191, 97);
	background: #fdb135;
	font-size: 11px;
	color: #cdcdcd;
	padding-top: 29px;

}

#ourTime > .second > span {
	font-size: 9px;
}

#ourTime span {
	display: block;
	font-weight: 300;
	color: white;
	font-family: "Muli";
}



</style>
