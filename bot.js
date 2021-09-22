const {Client, Intents} = require('discord.js');
const {joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,} = require('@discordjs/voice');
    const fs = require('fs');
    const ytdl = require('youtube-mp3-converter');
const {token} = require('./config.json');



const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

client.once('ready', ()=>{
    console.log('Ready!');
});

const audioPlayer = createAudioPlayer();
let paused = false;
client.on('messageCreate', message => {
    if (message.content.toLocaleLowerCase() === 'ping') {
      message.channel.send('pong');
    }
    else if (message.content.toLowerCase().startsWith('!play')){
        if(message.content.toLowerCase().startsWith('!play')){
            const link = message.content.split(" ")[1];
            const converter = ytdl('./music');
            const pathTomp3 = converter(link)
            .then(pathTomp3=>{
                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channelId,
                    guildId: message.member.guild.id,
                    adapterCreator: message.member.voice.guild.voiceAdapterCreator,
                });
                console.log(pathTomp3);
                const resource = createAudioResource(pathTomp3);
                audioPlayer.play(resource);
                const subscription = connection.subscribe(audioPlayer);
            });

        }
    }
    else if(message.content.toLowerCase().startsWith('!pause')){
        if(!paused){
            paused = audioPlayer.pause();
        }
        else{
            audioPlayer.unpause();
            paused = false;
        }

    }
    else if(message.content.toLowerCase().startsWith('!stop')){
        audioPlayer.stop();
    }
  });

client.login(token);
