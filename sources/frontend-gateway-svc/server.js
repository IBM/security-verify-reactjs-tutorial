
var express = require('express');
const session = require('express-session');
const path = require('path');
const axios = require('axios');

require('dotenv').config();
const config = {
	tenantUrl            : process.env.TENANT_URL,
	clientId             : process.env.CLIENT_ID,
	clientSecret         : process.env.CLIENT_SECRET,
	redirectUri          : process.env.REDIRECT_URI,
	responseType         : process.env.RESPONSE_TYPE,
	flowType             : process.env.FLOW_TYPE,
	scope                : process.env.SCOPE
};

var {OAuthContext} = require('ibm-verify-sdk');
var authClient = new OAuthContext(config);

const port = process.env.PORT || 3002;

const app = express();
app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: false
  }));


//TEST Func - non-secured
app.get("/testAPI", (req, res) => {
    console.log("/testAPI");
    console.log({ message: "Hello from testAPI Service!" });
    res.json({ message: "Hello from testAPI Service!" });
});

app.get('/login', (req, res) => {
    console.log("/login");
    res.set('Access-Control-Allow-Origin', '*');
	authClient.authenticate().then((url) => {
		console.log(`("======== Authentication redirect to: \n ${url}`);
		res.redirect(url);
	}).catch(error => {
		console.log(`There was an error with the authentication process:`, error);
		res.send(error);
	})
})

app.get('/redirect', (req, res) => {
    console.log("/redirect");
    res.set('Access-Control-Allow-Origin', '*');
	authClient.getToken(req.url).then(token => {
		token.expiry = new Date().getTime() + (token.expires_in * 1000);
		console.log("======== Token details:");
		console.log(token);
		req.session.token = token;
		authClient.userInfo(req.session.token)
			.then((response) => {
					res.redirect('/dashboard');
			}).catch((err) => {
				res.json(err);
			});
	}).catch(error => {
			res.send("ERROR: " + error);
	});
});


//Get Weather Details
app.get('/getWeatherDetails/:location', async (req, res) => {
	console.log("/getWeatherDetails");
	
	const location = req.params.location;
	const URL = process.env.WEATHER_SERVICE_URL + location;
	console.log(URL);
	
	if(req.session.token) {	
		var token = 'Bearer ' + req.session.token["access_token"];
		var config = {
			method: 'get',
			url: URL,
			headers: { 
			  'Authorization': token
			}
		  };
		await axios(config)
		.then( function (response) {
			console.log(response.data);
			let returnObj = {
				"Location" : response.data.name,
				"Weather" : response.data.weather[0].main,
				"Description": response.data.weather[0].description,
				"Temperature": response.data.main.temp,
				"Humidity" : response.data.main.humidity
			}
			res.send(returnObj);
		})
		.catch (function (error) {
			console.log(error);
			res.json({"Error": JSON.stringify(error)});
		});
	} else {
		console.log('ERROR: No valid token available in the current session.');
		res.json({"Error": "No valid token available in the current session."});
	}
	
});

//Get User Profile
app.get('/getUserProfile', async (req,res) => {
	console.log("/getUserProfile");
	const serviceURL = process.env.USER_PROFILE_SERVICE_URL;
	
	if(req.session.token) {	
		var token = 'Bearer ' + req.session.token["access_token"];
		var config = {
			method: 'get',
			url: serviceURL,
			headers: { 
			  'Authorization': token
			}
		  };
		await axios(config)
		.then( function (response) {
			console.log(response.data);
			let returnObj = {
				"User Name" : response.data.preferred_username,
				"User Type" : response.data.userType,
				"Grant Type": response.data.grant_type			}
			res.send(returnObj);
		})
		.catch (function (error) {
			console.log(error);
			res.json({"Error": JSON.stringify(error)});
		});
	} else {
		console.log('ERROR: No valid token available in the current session .')
		res.json({"Error": "No valid token available in the current session."});
	}
});




// serve the react app files
app.use(express.static(`${__dirname}/ui-react/build`));

app.get('*', (req,res) =>{
	// console.log(path.join(__dirname+'/ui-react/build/index.html'));
    res.sendFile(path.join(__dirname+'/ui-react/build/index.html'));
});  

// Start server
app.listen(port, () => {
	console.log('Listening on http://localhost:' + port);
});