# Bottest

A discord bot some games and useful stuff.     
Code is ok-ish I'd say.     
Use at your own risk.     
Yes it's all in one file.     

To use it you need node.js (and probably npm too).     
Clone the files and run npm install once you installed node and npm.     
Then just use node index.js to start the bot.

I most likely will include .js file validation in the future.     
This bot is not intended yet to be used across multiple Servers.     
**You need both config.js and data.js to use the bot.**     
Yes I might transfer to a Database to also allow the bot to operate on multiple Servers.     

Also I will await Canvas to be supported in Worker Threads so that it can render Images in the Background.

Template for config.js: (outdated, use the _ex.json)

{
  "token": "YourTokenGoesHere",
  "color": "#145DA0",
  "prefix": ".",
  "xkcd": "channel id",
  "epic": "channel id",
  "wel": "channel id"
}

Template for data.js:

{
  "ttt": {},
  "con": {},
  "chess": {},
  "chessusr": {},
  "message": {},
  "xkcd": "1980-01-01T00:00:00Z",
  "epic": "1980-01-01T00:00:00.000Z",
  "epicusr": {}
}
