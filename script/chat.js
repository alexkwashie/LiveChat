

//updating the username

//updating the room

//#Step 1-adding new chat documents
class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats'); //database to connect to
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
        const response = await this.chats.add(chat);
        return response;
    }

    // //#Step2- set-up a real-time listener to get new chats
    getChats(callback){
        this.chats
        .where('room', '==', 'gaming') //complex querys - this is to query only specified data
        .orderBy('created_at')//this orders the data by time etc
            .onSnapshot(snapshot =>{
                snapshot.docChanges().forEach(change =>{ //gets every chnage on the documents
                    if(change.type === 'added'){
                        callback(change.doc.data())//get the documents data from the database
                    }

                });
            });
    }



}


const chat1 = new Chatroom('gaming', 'kev');

//create new chat
chat1.getChats(data =>{
    console.log(data);
});
