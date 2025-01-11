const TelegramBot = require('node-telegram-bot-api')

const dotenv = require('dotenv')
dotenv.config();

const axios = require('axios')

const fs = require('fs')
const path = require("path")

const token = process.env.BOT_TOKEN

const bot = new TelegramBot(token, { polling: true });

bot.onText(/.+/, (msg) => {
    let text = msg.text
    bot.sendMessage(msg.chat.id, `Hey there \nYou typed: ${text}`)
}
)

bot.onText(/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Hello! I am a bot made by MR. Kishor Barman.\nType \joke to get jokes.\nType \song to get songs`)
})

bot.onText(/joke/i, async (msg) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke')
    const setup = joke.data.setup
    const punchline = joke.data.punchline
    bot.sendMessage(msg.chat.id, setup + " " + punchline + " 😂😂😂")
})

let songs = [
    "Apna Bana Le Piya.mp3",
    "Aunty police bulalegi.mp3",
    "Aye Mere Humsafar.mp3",
    "Bade Acche Lagte Hai.mp3",
    "Built in pain.mp3",
    "Cutiepie.mp3",
    "Dil ki tamanna hai.mp3",
    "Ek din ap yun humko mil jayenge.mp3",
    "Gulabi Aankhen Jo Teri Dekhi.mp3",
    "Heroine.mp3",
    "Hum Hain King.mp3",
    "Jeene Laga Hoon Pehle Se Zyada.mp3",
    "Kar Gayi Chull.mp3",
    "Kesariya Tera.mp3",
    "King Kong.mp3",
    "Lag Ja Gale.mp3",
    "Nadaaniyaan.mp3",
    "One bottle down.mp3",
    "Pal ek pal.mp3",
    "Radha teri chunari.mp3",
    "Raja ese kahe dekha ta raho.mp3",
    "saj ke sawar ke.mp3",
    "Sene se tere sar ko lagake.mp3",
    "Tera Hone Laga Hoon.mp3",
    "Teri Meri Gallan.mp3",
    "The Hookup Song.mp3",
    "Yeh Shaam Mastani.mp3"
]
bot.onText(/song/i, async (msg) => {
    let index = Math.floor(Math.random() * songs.length)
    let songFile = songs[index]
    const filePath = path.join(__dirname, 'music', songFile);

    if (fs.existsSync(filePath)) {
        await bot.sendAudio(msg.chat.id, filePath, { caption: `Now playing: ${songFile}` });
    } else {
        await bot.sendMessage(msg.chat.id, 'Sorry, the song file does not exist.');
    }
})