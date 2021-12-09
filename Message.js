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
                } else if (value.name == 'IdGenBot 🕵️‍♂️') {
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
                } else if (value.name == 'WeatherBot 🌤️') {
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

                    console.log(data);

                    let { results } = data;

                    let { picture: { large }, name: { last, first }, gender, location: { city, country }, phone, email } = results[0];



                    this.chatHistory.innerHTML +=
                        `<li class="bot-message-container">
                    <div class="message-data">
                        <img src="assets/img/${avatarUrl}" alt="avatar">
                        <span class="message-data-time">${nameBot} |</span>
                        <span class="message-data-time"> ${this.dateTime}</span>
            
                    </div>
            
                    <div class="message">
                    <figure style="height:100px">
                         <img src="${large}" width=auto height=100%>
                    </figure>
                        <p style="margin:0px">Nom & Prénom: ${last} ${first}</p>
                        <p style="margin:0px">Genre : ${gender}</p>
                        <p style="margin:0px">Localisation : ${city} ${country}</p>
                        <p style="margin:0px">Mobile : ${phone}</p>
                        <p style="margin:0px">Email : ${email}</p>   
                    </div>
                    </li>`;

                    localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
                        'sender': 'bot',
                        'type': 'api',
                        'name': nameBot,
                        'avatarUrl': avatarUrl,
                        'time': this.dateTime,
                        'picture': large,
                        'last': last,
                        'first': first,
                        'gender': gender,
                        'location': city,
                        'country': country,
                        'mobile': phone,
                        'email': email
                    }));

                    this.messageNbr++;
                    localStorage.setItem('messageNbr', JSON.stringify(this.messageNbr));
                })
        }
        if (commandApi == 'ApiWeatherCity' && atrApi) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${atrApi}&units=metric&appid=0fca50431d3ac68f87cd4f5098fab02b&lang=fr`)
                .then(res => res.json())
                .then(data => {

                    console.log(data);

                    let { icon, description } = data.weather[0]
                    let { name, base, coord: { lat, lon }, main: { humidity, temp, feels_like, temp_max, temp_min }, wind: { speed } } = data;

                    console.log(name);
                    console.log(icon);

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
                        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
                        <p style="margin:0px">Metéo: ${description}</p>
                        <p style="margin:0px">Ville: ${name}</p>
                        <p style="margin:0px">Type de base : ${base}</p>
                        <p style="margin:0px">Position de la station  : lat : ${lat} | lon : ${lon}</p>
                        <p style="margin:0px">Humidité : ${humidity} %</p>
                        <p style="margin:0px">Température actuelle : ${temp} °C</p>
                        <p style="margin:0px">Température Ressentie : ${feels_like} °C</p>
                        <p style="margin:0px">Température Maximun : ${temp_max}°C</p>
                        <p style="margin:0px">Température Minimum : ${temp_min}°C</p>
                        <p style="margin:0px">Vent : ${speed} m/s</p>   
                </div>
                    
                    </li>`

                        localStorage.setItem(`message-${this.messageNbr}`, JSON.stringify({
                            'sender': 'bot',
                            'type': 'api',
                            'name': nameBot,
                            'avatarUrl': avatarUrl,
                            'time': this.dateTime,
                            'picture': icon,
                            'weather': description,
                            'city': name,
                            'type_base': base,
                            'lon': lon,
                            'lat': lat,
                            'humidity': humidity,
                            'temp': temp,
                            'feels_like': feels_like,
                            'temp_max': temp_max,
                            'temp_min': temp_min,
                            'speed': speed
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