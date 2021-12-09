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

            if (this.messageClass.getMessage() === "/clear") {
                localStorage.clear();
                location.reload();
            }


            if (this.messageClass.getMessage() === "/help") {
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


