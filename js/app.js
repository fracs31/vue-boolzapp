const { createApp } = Vue; //Vue
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
            searchValue: "", //valore della barra di ricerca
            displayOptions: false
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
                //Messaggio da inviare
                const send = {
                    date: "20:00", //orario
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
            //Messaggio da ricevere
            const receive = {
                date: "20:00", //orario
                message: "Ok", //messaggio
                status: "received" //stato
            }; 
            this.contacts[this.keepActive].messages.push(receive); //aggiungo il contenuto alla lista dei messaggi
        },
        //Metodo per cancellare i messaggi
        deleteMessage(index) {
            this.contacts[this.currentActive].messages.splice(index, 1); //elimino il messaggio
        },
    }
}).mount('#app');