GetTime
=======

Node.js app to time calls to REST API.

Need to make a bunch of simple GET requests and see how long they take?  Create a json file for each suite of calls you want to make and GetTime will tell you the shortest, longest and average lengths.


## Prereqs
Uses winston for logging.  Automated setup in packages.json so just run:
```bash
npm install
```

## Usage
```bash
node GetTime.js configuration.json
```

Create a json file for each run you want to do.
```js
	{
		"host": "www.google.com",
		"path": "/search?q=",
		"port":443, //optional
		"headers": {	//optional
			"Content-Type": "application/json",
			"Accept": "application/json",
			"System-Id": "WEB"
		},
		"params": [
			"gangstead",
			"github",
			"gangstead+github",
			"reddit",
			"whales",
			"gonzohacker",
			"iamdevloper",
			"nodejs",
			"npm",
			"camp"
		]
	}
```
port number is optional. Default is 443.

headers are optional.  Default is none.

GetTime will make a GET request for each entry in the params array and the path will be host + [port] + path + param