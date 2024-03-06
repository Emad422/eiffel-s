const express = require('express');
const app = express();
const moment = require('moment')
const Discord = require('discord.js')
const color = "f7f8fc"
//express
app.use('/ping', (req, res) => {
  res.send(new Date());
});
app.listen(3000, () => {
  console.log('menio GO GO.') 
});
const db = require("pro.db")
//main v13 source
const { Client, Intents, MessageEmbed, User, MessageActionRow, MessageButton, Collection } = require('discord.js');
const client = new Client({
  intents : 98045,
  allowedMentions: { repliedUser: true },
});
const { REST } = require('@discordjs/rest');
const {  MessageSelectMenu } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
//vars
var prefix = "/" //prefix
var owners = ["1031289246897668258"]
//bot info
client.on('ready', () => {
    console.log(`Name Bot : ${client.user.username}`);
  console.log(`prefix Bot : ${prefix}`);
	console.log(`Tag : ${client.user.tag}`);
	console.log(`${client.guilds.cache.size} Servers`); 
	console.log(`${client.users.cache.size} Users`); console.log(`${client.channels.cache.size} Channels`);
      console.log(`[ ${client.guilds.cache.map(g => g.name).join(', \n ')} ]`);
}).setMaxListeners(0);
//status bot
client.on('ready', async() => {
    client.user.setStatus(`dnd`)
    let status = [` Servers : ${client.guilds.cache.size}`,`Users : ${client.users.cache.size}`,`/help`];
  setInterval(()=>{
    client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
})

//error fixer
 process.on("unhandledRejection", error => {
  return console.log(error)
}); 
 process.on("unhandledRejection", error => {
  return 
}); 
 process.on("unhandledRejection", error => {
  return 
}); 
client.on("ready" , () => {
const commands = [{
  name : "add",
  description : "لإضافة نصاب",
  options : [{
  name : "name",
  description : "اسم النصاب ",
    type: 3,
    required: true,
  },{
    name : "id",
    description : "ايدي النصاب",
    type : 3,
    required : true,
  },{
    name : "engorge",
    description: "القصة",
    type: 3,
    required: true,
  },{
    name : "directories",
    description : "الدلائل روابط",
    type : 3,
    required: true,
  }]
},{
  name : "remove",
  description : "لإزالة نصاب",
  options : [{
    name : "id",
    description : "ايدي النصاب",
    type : 3,
    required : true,
  }]
},{
  name : "check",
  description : "للتحقق من العضو  إذا كان نصاب أم لا",
  options : [{
    name : "id",
    description : "ايدي العضو",
    type : 3,
    required : true,
  }]
},{
    name : "ping",
  description : "the ping of the bot",
},{
    name : "help",
  description : "to view help menu",
}];
    const rest = new REST({ version: '9' }).setToken(process.env.token);
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
            console.log("Done Run ApplicationCommands");
        } catch (error) {
            console.error(error);
        }
    })();
})

client.on('interactionCreate', async(interaction) => {
await interaction.deferReply()
  if(interaction.commandName == "add") {
    if (
      !interaction.member.roles.cache.has('1214324378389454929') &&
      !interaction.member.roles.cache.has('1214324482437816381')
    ) {
      return interaction.reply({ content: 'Perms' });
    }
  const nasabtag = interaction.options.getString('name')
  const nasabid = interaction.options.getString('id')
  const sexxxx = interaction.options.getString('engorge')
  const photoid = interaction.options.getString('directories')
        db.set(`nasab_${nasabid}`, "true")
        db.set(`nasabtr_${nasabid}`, sexxxx)
        db.set(`nasabx_${nasabid}`, photoid)
        db.set(`nasabt_${nasabid}`, nasabtag)
          const donembed = new MessageEmbed()
            .setTitle('نصاب جديد')
            .setColor(`${color}`)
            .setDescription(`

 \`اسم النصاب\` **: ${nasabtag} **

 \`ايدي النصاب\` **: ${nasabid} **

\`القصة\` **: ${sexxxx} **

`)
.setImage(photoid)
  
  interaction.channel.send({embeds: [donembed]})
  }
    else if(interaction.commandName == "remove") {
      if (
        !interaction.member.roles.cache.has('1214324378389454929') &&
        !interaction.member.roles.cache.has('1214324482437816381')
      ) {
        return interaction.reply({ content: 'Perms' });
      }
      const nasabid = interaction.options.getString('id')
      
 const nasab = db.fetch(`nasab_${nasabid}`, "true")
  if(!nasab) return interaction.editReply(`he is not a scam`)
      
        db.delete(`nasab_${nasabid}`)
        db.delete(`nasabt_${nasabid}`)
          const donembed = new MessageEmbed()
            .setTitle('DONE REMOVING A SCAMMER')
            .setColor(`${color}`)
            .setDescription(`
**NAME SCAMBER** **: ${nasabtag} **

**ID SCAMBER** **: ${nasabid} **
`)
  
  interaction.editReply({embeds: [donembed]})
  }

    if(interaction.commandName == "check") {
   if(!interaction.member.permissions.has('SEND_MESSAGES_AND_CREATE_POSTS')) return interaction.editReply({content:'Perms Denied'})
      
        let nasabid = interaction.options.getString('id')
       const nasab = db.fetch(`nasab_${nasabid}`, "true")
      const embup = new MessageEmbed()
      .setTitle('ليس نصاب')
      .setColor(`${color}`)
      .setDescription(`
هذا الشخص لا يوجد في قائمة النصابين لاكن هذا لا يعني انه لاينصب عليك خذ وسيط من خادمنا 


`)
  if(!nasab) return interaction.editReply({embeds: [embup]})
                                      
      


      
  let nasabtag = db.get(`nasabt_${nasabid}`)
  let sexxxx = db.get(`nasabtr_${nasabid}`)
  let photoid = db.get(`nasabx_${nasabid}`)


          const donembed = new MessageEmbed()
            .setTitle('هذا الشخص موجود<:emoji_19:1083801236194721873> في قائمة النصابين الرجاء عدم التواصل معه')
            .setColor("RED")
            .setDescription(`

 \`اسم النصاب\` **: ${nasabtag} **

 \`ايدي النصاب\` **: ${nasabid} **

\`القصة\` **: ${sexxxx} **

`)
  .setImage(photoid)
      
  interaction.editReply({embeds: [donembed]})
  }
      if(interaction.commandName == "ping") {
  interaction.editReply({ content: `
\`\`\`js
Latency is ${interaction.createdTimestamp - interaction.createdTimestamp}ms. 
API Latency is ${Math.round(client.ws.ping)}ms.
\`\`\`
`})
  }

        if(interaction.commandName == "help") {
        const helpmainembed = new MessageEmbed()
        .setDescription(`
> /check = to check the member is a crook or not
`)

 interaction.editReply({embeds: [helpmainembed]})
  }
})

client.login(process.env.token)

function restart() {
  console.log('Restarting the application...');
  // حقوق بينجو... 
}

setInterval(restart, 60 * 1000); // يسوي رن كل دقيقه يعني ما يطفى