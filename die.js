var Twit = require('twit')
require('./config.js')

var t = new Twit({

	consumer_key : CONSUMER_KEY 
	, consumer_secret : CONSUMER_SECRET 
	, access_token: ACCESS_TOKEN
	, access_token_secret: ACCESS_TOKEN_SECRET

})

var suicide = function(){

	t.get('statuses/user_timeline', {}, function(err, data, response){
		
		attempts_left 	=	 response.headers['x-rate-limit-remaining']
		reset 			= 		 response.headers['x-rate-limit-reset']

		console.log("x-rate-limit-remaining: " + attempts_left)
		console.log("x-rate-limit-reset: " + reset)

		if(attempts_left == 1){
			time_left = (reset - Date.now()) * 1000
			console.log("Resuming in " + time_left)
			setTimeout(suicide, time_left)
		}
		else{

		if(!err){
			tweet_count = Object.keys(data).length

			console.log(data)

			if (tweet_count > 1)

			{
			for(tweet in data)
				destroy_tweet(data[tweet].id_str)


			suicide()
			}


			else
				console.log("The right to be forgotten")

		}
		else
			console.log(err)
		}
	
	})
}

function destroy_tweet(tweet_id){
	t.post('statuses/destroy', {id:tweet_id}, function(err,data,response){
		if(err)
			console.log(err)
	})
}

suicide()
