const client = new Discord.Client();
const config = require("./config.json");
var dispatcher;

client.login(process.env.token);

client.on("ready", () => {
	console.log(`Le bot est connecté, avec ${client.users.size} utilisateurs, dans ${client.channels.size} channels de ${client.guilds.size} serveurs.`); 
	client.user.setActivity("aux échecs avec un Balrog.");
});

client.on("guildMemberAdd", member => {
	member.createDM().then(channel => {
		return channel.send("Bienvenue dans **Digido Studio** " + member.displayName);
	}).catch(console.error)
});

client.on("message", async message => {

	if(message.author.bot) return;
  
	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "help") {
		message.channel.send({embed: {
			color: 130,
			description: `**Liste des commandes :**\n\n\`//help\`\n *Utilisation: //help*\n\n\`//ping\`\n *Utilisation: //ping*\n\n\`//say\`\n *Utilisation: //say La chose à faire dire au bot !*\n\n\`//poll\`\n *Utilisation : //poll |Titre du sondage|Proposition 1|Proposition 2|Proposition 3|Proposition 4*\n\n\`//kick\`\n *Utilisation: //kick @lenomdumembre#0000 La raison du kick !*\n\n\`//ban\`\n *Utilisation: //ban @lenomdumembre#0000 La raison du ban !*\n\n\`//nuke\`\n *Utilisation: //nuke Un_nombre_entre_2_et_100*\n\n\`//mpto\`\n *Utilisation: //mpto | @lenomdumembre#0000 Le MP à envoyer*\n\n\`//play\`\n *Utilisation: //play URL_de_la_musique*\n\n\`//pause\`\n *Utilisation: //pause*\n\n\`//resume\`\n *Utilisation: //resume*\n\n\`//connect\`\n *Utilisation: //connect*\n\n\`//disconnect\`\n *Utilisation: //disconnect*\n\n\`//report\`\n *Utilisation: //report @lenomdumembre#0000 La raison du report*\n\n\`//reportbug\`\n *Utilisation: //reportbug L'explication du bug report*`
		}});
    }
});