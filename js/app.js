const { createApp } = Vue; //Vue
const { DateTime } = luxon; //Luxon
//App
createApp({
    //Dati
    data() {
        return {
            //Contatti
            contacts: [
                {
                    name: "Michele",
                    avatar: "./img/avatar_1.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il cane?",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di stendere i panni",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Tutto fatto!",
                            status: "received"
                        }
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "./img/avatar_2.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            message: "Ciao come stai?",
                            status: "sent"
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            message: "Bene grazie! Stasera ci vediamo?",
                            status: "received"
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            message: "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "sent"
                        }
                    ],
                },
                {
                    name: "Samuele",
                    avatar: "./img/avatar_3.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "La Marianna va in campagna",
                            status: "received"
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent"
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
                            status: "received"
                        }
                    ],
                },
                {
                    name: "Alessandro B.",
                    avatar: "./img/avatar_4.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Si, ma preferirei andare al cinema",
                            status: "received"
                        }
                    ],
                },
                {
                    name: "Alessandro L.",
                    avatar: "./img/avatar_5.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Ricordati di chiamare la nonna",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Va bene, stasera la sento",
                            status: "received"
                        }
                    ],
                },
                {
                    name: "Claudia",
                    avatar: "./img/avatar_6.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Ciao Claudia, hai novità?",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Non ancora",
                            status: "received"
                        },
                        {
                            date: "10/01/2020 15:51:00",
                            message: "Nessuna nuova, buona nuova",
                            status: "sent"
                        }
                    ],
                },
                {
                    name: "Federico",
                    avatar: "./img/avatar_7.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Fai gli auguri a Martina che è il suo compleanno!",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Grazie per avermelo ricordato, le scrivo subito!",
                            status: "received"
                        }
                    ],
                },
                {
                    name: "Davide",
                    avatar: "./img/avatar_8.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Ciao, andiamo a mangiare la pizza stasera?",
                            status: "received"
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
                            status: "sent"
                        },
                        {
                            date: "10/01/2020 15:51:00",
                            message: "OK!!",
                            status: "received"
                        }
                    ],
                }
            ],
            currentActive: 0, //indice della chat attiva
            keepActive: 0, //indice che si salva la vecchia chat attiva per poter inviare il messaggio correttamente, anche se si ha cambiato conversazione 
            newMessage: "", //nuovo messaggio
            searchValue: "" //valore della barra di ricerca
        }
    },
    //Watchers
    watch: {
        //Indice della chat attiva
        currentActive() {
            const optionsMessageElement = document.querySelectorAll(".message__options"); //opzioni del messaggio nel DOM
            //Ciclo
            for (let i = 0; i < optionsMessageElement.length; i++) {
                optionsMessageElement[i].classList.remove("block"); //nascondo tutte le opzioni nel DOM
            }
        }
    },
    //Metodi
    methods: {
        //Metodo per impostare la chat attiva
        setActive(index) {
            this.currentActive = index; //imposto l'indice dal contatto cliccato come l'indice della chat attiva
        },
        //Metodo per inviare i messaggi
        sendMessage() {
            //Se il messaggio non è vuoto
            if (this.newMessage.trim() != "") {
                let newDate = DateTime.now(); //prendo la data attuale
                newDate = newDate.toFormat("dd/LL/yyyy HH:mm:ss"); //converto la data attuale
                //Messaggio da inviare
                const send = {
                    date: newDate, //data
                    message: this.newMessage, //messaggio
                    status: "sent" //stato
                };
                this.contacts[this.currentActive].messages.push(send); //aggiungo il contenuto alla lista dei messaggi
                this.keepActive = this.currentActive; //salvo l'indice della chat attiva
                this.newMessage = ""; //azzero il valore del nuovo messaggio
                setTimeout(this.receiveMessage, 1000); //ricevo un messaggio finto dopo 1 secondo
            }
        },
        //Metodo per ricevere i messaggi
        receiveMessage() {
            let newDate = DateTime.now(); //prendo la data attuale
            newDate = newDate.toFormat("dd/LL/yyyy HH:mm:ss"); //converto la data attuale
            //Messaggio da ricevere
            const receive = {
                date: newDate, //data
                message: "Ok", //messaggio
                status: "received" //stato
            }; 
            this.contacts[this.keepActive].messages.push(receive); //aggiungo il contenuto alla lista dei messaggi
        },
        //Metodo per convertire la data e ottenere solo l'orario in ore e minuti
        getOnlyTime(date) {
            let newDate = DateTime.fromFormat(date , "dd/LL/yyyy HH:mm:ss"); //prendo la data e la converto
            newDate = newDate.toFormat("HH:mm"); //prendo solo le ore e i minuti
            return newDate; //restituisco la data convertita
        },
        //Metodo per cancellare i messaggi
        deleteMessage(index) {
            this.contacts[this.currentActive].messages.splice(index, 1); //elimino il messaggio
        },
        //Metodo per mostrare le opzioni del messaggio
        showOptions(index) {
            const optionsMessageElement = document.getElementById("msg-" + index); //opzioni del messaggio nel DOM
            //Se il messaggio esiste ancora
            if (optionsMessageElement != null) {
                optionsMessageElement.classList.toggle("block"); //mostro o nascondo le opzioni
            }
        }
    }
}).mount('#app');