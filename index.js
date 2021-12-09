/**************
*
*  Class Bot
*
**************/

class Bot {
    constructor(name, desc, avatar, command, commandExplain, commandApi, commandApiExplain, response) {
        this.name = name;
        this.desc = desc;
        this.avatar = avatar
        this.command = command;
        this.commandExplain = commandExplain;
        this.commandApi = commandApi;
        this.commandApiExplain = commandApiExplain;
        this.response = response;
    }
}

/**************
*
*  Class Message
*
**************/
class Message {

    constructor() {

        //Global selector
        this.chatHistory = document.querySelector(".chat-history ul");
        this.btnSendMsg = document.querySelector(".submit");
        this.formControl = document.querySelector(".input");

        //Init localStorage if "messageNbr" not exist
        if (!localStorage.getItem('messageNbr')) {
            localStorage.setItem('messageNbr', 0);
            location.reload();
        } else {
            this.messageNbr = localStorage.getItem('messageNbr');

        }

    }

    //Function for scroll Windows to bottom when new msg
    scrollWindow(delay) {
        setTimeout(() => {
            window.scrollTo(0, this.chatHistory.scrollHeight);
        }, delay);
    }

    //Function for get Hour in dateTime
    getTimeHour() {

        var arrayOfWeekdays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Vend", "Sam"]
        var arrayOfMonths = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]

        this.today = new Date();
        this.time = arrayOfWeekdays[this.today.getDay()] + " " + this.today.getDate() + " " + arrayOfMonths[this.today.getMonth()] + " " + this.today.getFullYear() + " à "
            + this.today.getHours() + ":"
            + this.today.getMinutes() + ":"
            + this.today.getSeconds();
        return this.dateTime = this.time;
    }

    //Function for get message content in the text input
    getMessage() {
        return this.msgContent = this.formControl.value;
    }

    //Function for set delay in async funct
    delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
        });
    }

    //Function for get olg message with localStorage
    oldMessageLocalStorage() { //async

        var values = []
        var keys = Object.keys(localStorage)

        //get and push localStorage data in array
        for (let i = 0; i < keys.length - 1; i++) {

            values.push(JSON.parse(localStorage.getItem(`message-${i}`)))
        }

        console.log(values);
        //display old message
        for (const [key, value] of Object.entries(values)) {

            this.scrollWindow(500);

            //await this.delay(0.2);

            if (value.sender == 'me' && value.type == 'message') {

                this.chatHistory.innerHTML += `
                    <li class="my-message-container">
                        <div>
                            <span class="message-data-time">${value.time}</span>
                        </div>
                        <span data-testid="tail-out" data-icon="tail-out" class="_3nrYb"><svg viewBox="0 0 8 13" width="8" height="13" class=""><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg></span>
                        <div class="message-me">${value.content}</div>
                    </li>`;


            } else if (value.sender == 'bot' && value.type == 'message') {

                this.chatHistory.innerHTML += `
                        <li class="bot-message-container">
                        <div class="message-data">
                            <img src="assets/img/${value.avatarUrl}" alt="avatar">
                            <span class="message-data-time">${value.name} |</span>
                            <span class="message-data-time"> ${value.time}</span>
                
                        </div>
                
                        <div class="message">${value.content}</div>
                        </li>`;


            }
            else if (value.sender == 'bot' && value.type == 'api') {

                if (value.name == 'DogoBot 🐶') {
                    this.chatHistory.innerHTML += `
                        <li class="bot-message-container">
                        <div class="message-data">
                            <img src="assets/img/${value.avatarUrl}" alt="avatar">
                            <span class="message-data-time">${value.name} |</span>
                            <span class="message-data-time"> ${value.time}</span>
                        </div>
                
                        <div class="message" style="height:300px"><img src="${value.urlImg}" width=auto height=100% alt=""></div>
                        </li>`;
                } else if (value.name == 'IdGenBot') {
                    this.chatHistory.innerHTML +=
                        `<li class="bot-message-container">
                            <div class="message-data">
                                <img src="assets/img/${value.avatarUrl}" alt="avatar">
                                <span class="message-data-time">${value.name} |</span>
                                <span class="message-data-time"> ${value.time}</span>
                    
                            </div>
                    
                            <div class="message">
                            <figure style="height:100px">
                                <img src="${value.picture}" width=auto height=100%>
                            </figure>
                                <p style="margin:0px">Nom & Prénom: ${value.last + ' ' + value.first}</p>
                                <p style="margin:0px">Genre : ${value.gender}</p>
                                <p style="margin:0px">Localisation : ${value.city + ', ' + value.country}</p>
                                <p style="margin:0px">Mobile : ${value.mobile}</p>
                                <p style="margin:0px">Email : ${value.email}</p>   
                            </div>
                            </li>`;
                } else if (value.name == 'WeatherBot') {
                    this.chatHistory.innerHTML +=
                        `<li class="bot-message-container">
                <div class="message-data">
                    <img src="assets/img/${value.avatarUrl}" alt="avatar">
                    <span class="message-data-time">${value.name} |</span>
                    <span class="message-data-time"> ${value.time}</span>
        
                </div>
                    <div class="message">
                    <img src="http://openweathermap.org/img/wn/${value.picture}@2x.png" alt="">
                    <p style="margin:0px">Metéo: ${value.weather}</p>
                    <p style="margin:0px">Ville: ${value.city}</p>
                    <p style="margin:0px">Type de base : ${value.type_base}</p>
                    <p style="margin:0px">Position de la station  : ${'lat : ' + value.lat + ' | lon : ' + value.lon}</p>
                    <p style="margin:0px">Humidité : ${value.humidity + ' %'}</p>
                    <p style="margin:0px">Température actuelle : ${value.temp + '°C'}</p>
                    <p style="margin:0px">Température Ressentie : ${value.feels_like + '°C'}</p>
                    <p style="margin:0px">Température Maximun : ${value.temp_max + '°C'}</p>
                    <p style="margin:0px">Température Minimum : ${value.temp_min + '°C'}</p>
                    <p style="margin:0px">Vent : ${value.speed + ' m/s'}</p>   
            </div>
                
                </li>`
                }


            }

        }

    }

    //Function for send text humain message 
    sendMessage(contentMsg) {

        this.getTimeHour();

        this.chatHistory.innerHTML += `
            <li class="my-message-container">
                <div>
                    <span class="message-data-time">${this.dateTime}</span>
                </div>
                <span data-testid="tail-out" data-icon="tail-out" class="_3nrYb"><svg viewBox="0 0 8 13" width="8" height="13" class=""><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg></span>
                <div class="message-me">${contentMsg}</div>
            </li>`;

        localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
            'sender': 'me',
            'type': 'message',
            'time': this.dateTime,
            'content': contentMsg
        }));

        this.messageNbr++;
        localStorage.setItem('messageNbr', JSON.stringify(this.messageNbr));

    }

    //Function for send bot message 
    sendMessageBot(contentMsg, avatarUrl, nameBot) {

        this.getTimeHour();

        this.chatHistory.innerHTML += `
        <li class="bot-message-container">
        <div class="message-data">
            <img src="assets/img/${avatarUrl}" alt="avatar">
            <span class="message-data-time">${nameBot} |</span>
            <span class="message-data-time"> ${this.dateTime}</span>

        </div>

        <div class="message">${contentMsg}</div>
        </li>`;

        localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
            'sender': 'bot',
            'type': 'message',
            'name': nameBot,
            'avatarUrl': avatarUrl,
            'time': this.dateTime,
            'content': contentMsg
        }));

        this.messageNbr++;
        localStorage.setItem('messageNbr', JSON.stringify(this.messageNbr));
    }

    //Function for send humain message Api
    sendMessageBotApi(avatarUrl, nameBot, commandApi, atrApi) {

        this.getTimeHour();

        if (commandApi == 'ApiDogo') {
            fetch('https://api.thedogapi.com/v1/images/search')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.chatHistory.innerHTML += `
            <li class="bot-message-container">
            <div class="message-data">
                <img src="assets/img/${avatarUrl}" alt="avatar">
                <span class="message-data-time">${nameBot} |</span>
                <span class="message-data-time"> ${this.dateTime}</span>
            </div>
    
            <div class="message" style="height:300px"><img src="${data[0].url}" width=auto height=100% alt=""></div>
            </li>`;

                    localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
                        'sender': 'bot',
                        'type': 'api',
                        'name': nameBot,
                        'avatarUrl': avatarUrl,
                        'urlImg': data[0].url,
                        'time': this.dateTime
                    }));

                    this.messageNbr++;
                    localStorage.setItem('messageNbr', JSON.stringify(this.messageNbr));
                })

        }

        if (commandApi == 'ApiGenId') {
            fetch('https://randomuser.me/api/?nat=fr')
                .then(res => res.json())
                .then(data => {
                    this.chatHistory.innerHTML +=
                        `<li class="bot-message-container">
                    <div class="message-data">
                        <img src="assets/img/${avatarUrl}" alt="avatar">
                        <span class="message-data-time">${nameBot} |</span>
                        <span class="message-data-time"> ${this.dateTime}</span>
            
                    </div>
            
                    <div class="message">
                    <figure style="height:100px">
                         <img src="${data['results'][0]['picture']['large']}" width=auto height=100%>
                    </figure>
                        <p style="margin:0px">Nom & Prénom: ${data['results'][0]['name']['last'] + ' ' + data['results'][0]['name']['first']}</p>
                        <p style="margin:0px">Genre : ${data['results'][0]['gender']}</p>
                        <p style="margin:0px">Localisation : ${data['results'][0]['location']['city'] + ', ' + data['results'][0]['location']['country']}</p>
                        <p style="margin:0px">Mobile : ${data['results'][0]['phone']}</p>
                        <p style="margin:0px">Email : ${data['results'][0]['email']}</p>   
                    </div>
                    </li>`;

                    localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
                        'sender': 'bot',
                        'type': 'api',
                        'name': nameBot,
                        'avatarUrl': avatarUrl,
                        'time': this.dateTime,
                        'picture': data['results'][0]['picture']['large'],
                        'last': data['results'][0]['name']['last'],
                        'first': data['results'][0]['name']['first'],
                        'gender': data['results'][0]['gender'],
                        'location': data['results'][0]['location']['city'],
                        'country': data['results'][0]['location']['country'],
                        'mobile': data['results'][0]['phone'],
                        'email': data['results'][0]['email']
                    }));

                    this.messageNbr++;
                    localStorage.setItem('messageNbr', JSON.stringify(this.messageNbr));
                })
        }
        if (commandApi == 'ApiWeatherCity' && atrApi) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${atrApi}&units=metric&appid=0fca50431d3ac68f87cd4f5098fab02b&lang=fr`)
                .then(res => res.json())
                .then(data => {

                    if (data['cod'] == '404') {
                        this.sendMessageBot(`⚠️⚠️🛑 Attention la ville que vous avez rentré est incorrect 🛑⚠️⚠️`, avatarUrl, nameBot);
                    } else {
                        this.chatHistory.innerHTML +=
                            `<li class="bot-message-container">
                    <div class="message-data">
                        <img src="assets/img/${avatarUrl}" alt="avatar">
                        <span class="message-data-time">${nameBot} |</span>
                        <span class="message-data-time"> ${this.dateTime}</span>
            
                    </div>
                        <div class="message">
                        <img src="http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png" alt="">
                        <p style="margin:0px">Metéo: ${data['weather'][0]['description']}</p>
                        <p style="margin:0px">Ville: ${data['name']}</p>
                        <p style="margin:0px">Type de base : ${data['base']}</p>
                        <p style="margin:0px">Position de la station  : ${'lat : ' + data['coord']['lat'] + ' | lon : ' + data['coord']['lon']}</p>
                        <p style="margin:0px">Humidité : ${data['main']['humidity'] + ' %'}</p>
                        <p style="margin:0px">Température actuelle : ${data['main']['temp'] + '°C'}</p>
                        <p style="margin:0px">Température Ressentie : ${data['main']['feels_like'] + '°C'}</p>
                        <p style="margin:0px">Température Maximun : ${data['main']['temp_max'] + '°C'}</p>
                        <p style="margin:0px">Température Minimum : ${data['main']['temp_min'] + '°C'}</p>
                        <p style="margin:0px">Vent : ${data['wind']['speed'] + ' m/s'}</p>   
                </div>
                    
                    </li>`

                        localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
                            'sender': 'bot',
                            'type': 'api',
                            'name': nameBot,
                            'avatarUrl': avatarUrl,
                            'time': this.dateTime,
                            'picture': data['weather'][0]['icon'],
                            'weather': data['weather'][0]['description'],
                            'city': data['name'],
                            'type_base': data['base'],
                            'lon': data['coord']['lon'],
                            'lat': data['coord']['lat'],
                            'humidity': data['main']['humidity'],
                            'temp': data['main']['temp'],
                            'feels_like': data['main']['feels_like'],
                            'temp_max': data['main']['temp_max'],
                            'temp_min': data['main']['temp_min'],
                            'speed': data['wind']['speed']
                        }));

                        this.messageNbr++;
                        localStorage.setItem('messageNbr', JSON.stringify(this.messageNbr));
                    }
                })

        }
        if (commandApi == 'ApiWeatherCity' && !atrApi) {
            this.sendMessageBot(`<h1>Aide pour l'utilisation de l'ApiWeatherCity</h1>
            <p>Pour uriliser l'Api vous devez entrer ApiWeatherCity 
            et à la suite le nom de la ville ou vous voulez récupérer la météo</p>
            <p>Exemple : ApiWeatherCity Melun</p>`, avatarUrl, nameBot);
        }
    }

}
/**************
*
*  Class ChatBot
*
**************/
class ChatBot {
    constructor() {

        this.formInput = document.querySelector(".input");
        this.containerBotList = document.querySelector(".bot-list ul");
        this.messageClass = new Message();
        this.messageClass.oldMessageLocalStorage();

        const style = 'color:red; font-size:50px; font-weight: bold; -webkit-text-stroke: 1px white;'
        console.log("%cChatBot.io", style);

        const style1 = 'color:white; font-size:20px; font-weight: bold; -webkit-text-stroke: 1px black;'
        console.log("%cDévelopper par Tom Bost", style1);

        console.log("%c ", "font-size: 1px; padding: 50px; background-size: 350px; background: no-repeat url(https://tom-bost.fr/assets/img/data/logo-tb.svg");

        //Generation Bot
        this.botList = {
            b1: new Bot(
                'DogoBot 🐶', //Name
                'Je suis DogoBot, le robot chien 🐕', //Desc
                'bot-avatar-dogobot.png', //Avatar
                ['Bonjour DogoBot', 'Ouafouaf', 'On va faire un tour ?'], //Command
                ['Permet de dire bonjour au bot', 'Permet d\'échanger avec DogoBot', 'Permet de proposer un tour à DogoBot'], //CommandExplain
                ['ApiDogo'], //CommandApi
                ['Permet de générer une image aléatoire de chien'], //CommandExplainApi
                ['Ouaf Ouaf c\'est moi DogoBot', 'Depuis quand tu parles ma langue ?', 'Avec plaisir où va-t-on ?'] //response
            ),
            b2: new Bot(
                'IdGenBot 🕵️‍♂️', //Name
                'Bot générateur d\'identité, MR ❓❓', //Desc
                'bot-avatar-GenIdBott.png', //Avatar
                ['Bonjour IdGenBot', 'AnoDiscover', '01000010'], //Command
                ['Permet de dire bonjour au bot', 'Permet de découvrir l\'identité du bot', 'Permet de parler avec IdGenBot'], //CommandExplain
                ['ApiGenId'], //Command Api
                ['Permet de générer une identité aléatoire'], //CommandExplainApi
                ['01000010 01101111 01101110 01101010 01101111 01110101 01110010 00100000', 'Crois-tu que tu va me démasquer si facilement ?', 'Toi aussi tu parles le binaire ???'] //response
            ),
            b3: new Bot(
                'WeatherBot 🌤️', //Name
                'Tu veut la météo ? Je te la donne. 🌡️', //Desc
                'bot-avatar-weatherbot.png', //Avatar
                ['Bonjour WeatherBot', 'Cyclone', 'Vive le vent'], //Command
                ['Permet de dire bonjour au bot', 'Permet de recevoir une blague du bot', 'Permet de réclamer le vent'], //CommandExplain
                ['ApiWeatherCity'], //CommandApi
                ['Permet d\'obtenir la méteo d\'une ville'], //CommandExplainApi
                ['Bonjour mon rayon de soleil 🌞', 'Qu\'est-ce qu\'un cyclone a dit à l\'autre ? J\'ai mon oeil qui vous surveille.', 'D\'hiver, c\'est rigolo hein !!!']//response
            )
        };
        this.run();
    }

    //Function for list all bots
    listBot() {
        for (let i in this.botList) {
            this.containerBotList.innerHTML +=
                `<li class="clearfix">
                <img src="assets/img/${this.botList[i].avatar}" alt="avatar">
                <div class="about">
                    <div class="name">${this.botList[i].name}</div>
                    <div class="status">${this.botList[i].desc}</div>
                </div>
        </li>`;
        }

    }

    //Function core for chat bost
    core() {

        this.messageClass.formControl.addEventListener("keypress", (e) => {

            if (e.key === 'Enter' && this.messageClass.getMessage() != "") {
                this.messageClass.btnSendMsg.click();
            }

        });

        this.messageClass.btnSendMsg.addEventListener("click", (e) => {

            const getCommandForAtr = this.messageClass.getMessage();
            this.splitCommand = getCommandForAtr.split(' ');

            for (const [key] of Object.entries(this.botList)) {


                if (this.botList[key].command.includes(this.messageClass.getMessage())) {

                    var position = this.botList[key].command.indexOf(this.messageClass.getMessage())

                    if (this.messageClass.getMessage() != "") {

                        this.messageClass.sendMessage(this.messageClass.getMessage());

                        this.messageClass.scrollWindow(400);

                        setTimeout(() => {
                            this.messageClass.sendMessageBot(this.botList[key].response[position], this.botList[key].avatar, this.botList[key].name);
                            this.messageClass.scrollWindow(1000);
                        }, 1000);

                        this.messageClass.formControl.value = "";
                    };

                }

                if (this.botList[key].commandApi.includes(this.splitCommand[0])) {
                    this.messageClass.sendMessage(this.messageClass.getMessage());
                    this.messageClass.scrollWindow(400);

                    setTimeout(() => {
                        this.messageClass.sendMessageBotApi(this.botList[key].avatar, this.botList[key].name, this.botList[key].commandApi, this.splitCommand[1])
                        this.messageClass.scrollWindow(1500);
                    }, 1000);

                    this.messageClass.formControl.value = "";
                }

            }

            if (this.messageClass.getMessage() === "help") {
                this.messageClass.sendMessage(this.messageClass.getMessage());
                this.messageClass.scrollWindow(200);

                let delay = 1000
                for (let i in this.botList) {

                    setTimeout(() => {
                        this.listCommandBot = '';

                        for (let j in this.botList[i].command) {
                            this.listCommandBot += `
                        <li style="margin:0"><strong>${this.botList[i].command[j]} :</strong><i> ${this.botList[i].commandExplain[j]}</i></li>
                        `;
                        }

                        this.listCommandBotApi = '';
                        for (let k in this.botList[i].commandApi) {
                            this.listCommandBotApi += `
                        <li style="margin:0"><strong>${this.botList[i].commandApi[k]} :</strong><i> ${this.botList[i].commandApiExplain[k]}</i></li>
                        `;
                        }

                        this.messageClass.sendMessageBot(`
                        <p>Je suis ${this.botList[i].name} et mes commandes sont les suivantes : </p><ul> ${this.listCommandBot} ${this.listCommandBotApi}</ul> `, this.botList[i].avatar, this.botList[i].name)
                        this.messageClass.scrollWindow(300);
                    }, delay)
                    delay += 500
                }
            }

            this.messageClass.formControl.value = "";


        });
    }

    run() {
        this.listBot();
        this.core();
    }
}

const chatbot = new ChatBot();


