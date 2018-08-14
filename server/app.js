const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
} );

client.on("message", (message) => {

	if( message.author.bot ) return;

	if(message.content.startsWith(config.phpPrefix) ) {
		var args = getArguments(message, "!php");
		var searchQuery = args;
		var searchUrl = config.phpSearchQuery;
		searchUrl += '';
		searchUrl = searchUrl.replace( "\$s", searchQuery);
		message.channel.send( {embed: {
				color : 3447003,
				title: "Results from php.net",
				url: searchUrl,
				description: "These are the results based on your query"
			}
		} );
	} else if( message.content.startsWith(config.jsPrefix) ) {
		var args = getArguments(message, "!js" );
		var searchQuery = args;
		var searchUrl = config.jsSearchQuery;
		searchUrl += '';
		searchUrl = searchUrl.replace( "\$s", searchQuery);
		console.log( searchUrl );
		message.channel.send( {embed: {
				color : 3447003,
				title: "Results from developer.mozilla.org",
				url: searchUrl,
				description: "These are the results based on your query"
			}
		} );
	} else if( message.content.startsWith(config.stackPrefix) ) {
		var args = getArguments(message, "!stack" );
		var searchQuery = args;
		var searchUrl = config.stackSearchQuery;
		searchUrl += '';
		searchUrl = searchUrl.replace( "\$s", searchQuery);
		console.log( searchUrl );
		message.channel.send( {embed: {
				color : 3447003,
				title: "Results from stackoverflow.com",
				url: searchUrl,
				description: "These are the results based on your query"
			}
		} );
	} else if( message.content.startsWith("!help") ) {
		message.channel.send("The commands you can use are !php, !js, !stack.\nPlease enter your query in plain text, separated with spaces.")
	}


} );

function getArguments( sMessage, sPrefix ) {
	const args = sMessage.content.slice(sPrefix.length).trim().split( / +/g );
	return args.join("+");
}

client.login(config.token);