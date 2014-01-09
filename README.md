GetTime
=======

Node.js app to time calls to REST API.

Need to make a bunch of simple GET requests and see how long they take?  Create a json file for each suite of calls you want to make and GetTime will tell you the shortest, longest and average lengths.  This version is https only.

* [Setup](#setup)
* [Configuration](#configuration)
* [Usage](#usage)
* [Example](#example)

## Setup
Since this is a node app it is assumed that you have Node and npm installed.  GetTime uses winston for logging.  Automated setup is in packages.json so just run:
```bash
npm install
```

## Configuration

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

GetTime will make a GET request for each entry in the params array and the path will be host + [port] + path + param.  This example will make 10 Get requests to google and time the successful results.

## Usage
It's all command line:
```bash
node GetTime.js configuration.json
```
## Example
Output will be saved to GetTime.log as well as the terminal.  You'll see stats saved after every run, errors noted (they don't count towards timing stats), and the final stats put to terminal:

```bash
Steves-MacBook-Pro:GetTime stevegangstead$ node GetTime.js example.json
info:  count=1, average=117, shortest=117, longest=117, errors=0, last=117
info:  count=2, average=100, shortest=83, longest=117, errors=0, last=83
info:  count=3, average=93.66666666666667, shortest=81, longest=117, errors=0, last=81
info:  count=4, average=91, shortest=81, longest=117, errors=0, last=83
info:  count=5, average=91.6, shortest=81, longest=117, errors=0, last=94
info:  count=6, average=89.5, shortest=79, longest=117, errors=0, last=79
info:  count=7, average=87.28571428571429, shortest=74, longest=117, errors=0, last=74
info:  count=8, average=106.75, shortest=74, longest=243, errors=0, last=243
info:  count=9, average=103, shortest=73, longest=243, errors=0, last=73
info:  count=10, average=100.7, shortest=73, longest=243, errors=0, last=80
info: Completed all requests
info: Final Stats:
info:  count=10, average=100.7, shortest=73, longest=243, errors=0, last=80
Steves-MacBook-Pro:GetTime stevegangstead$
```
