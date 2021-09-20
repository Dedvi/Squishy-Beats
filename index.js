const Discord = require('discord.js');
{
    prefix,
    token
}require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
client.login(token);

client.once('ready', ()=>{
    console.log("Ready!");
});

client.once('warn', ()=>{
    console.log("Warning!");
});

client.once('invalidated', ()=>{
    console.log("Disconnected");
});
