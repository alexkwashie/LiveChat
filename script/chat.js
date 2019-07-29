//adding new chat documents

// setting up a reat-time listener to get new chats

//updating the username

//updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }

    //because it might take some time to add the chat data to the database, will use async
    async addChat(message){
        //format chat object
        const now = new Date();
        const chat = {
            message,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        //Add data to firebase
        const responds = await  this.chats.add(chat);
        return responds;
    }
}


const chat1 = new Chatroom('gaming', 'kev');

console.log(chat1);