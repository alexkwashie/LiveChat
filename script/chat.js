

//updating the username

//updating the room

//#Step 1-adding new chat documents
class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats'); //database to connect to
        this.unsub; //this is going to be used to unsubcribe the getChats() from the set 'chat1' on line 64
    }

    //because it might take some time to add the chat data to the database, will use async
    async addChat(message){

        //format chat object
        const now = new Date();

        const chat = {
            message,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(now)//get time from firebase
        };

        //Add data to firebase
        const response = await this.chats.add(chat);
        return response;
    }



    // //#Step2- set-up a real-time listener to get new chats
    getChats(callback){
        this.unsub = this.chats //this returns a function
        .where('room', '==', this.room) // or 'gaming'  //complex querys - this is to query only specified data
        .orderBy('created_at')//this orders the data by time etc
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change =>{ //gets every chnage on the documents
                if(change.type === 'added'){
                    callback(change.doc.data())//get the documents data from the database
                    }
                });
            });
    }

    //update username
    UpdateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    //update room
    UpdateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){ //this is to check if the unsub has a value
            this.unsub();

        //this.unsub means, remove from present room to new set room
        }
    }

}


/*
//Test code:

//Assign new memeber
const chat1 = new Chatroom('gaming', 'kev');

//create new chat
chat1.getChats(data =>{
    console.log(data);
});


//Switch to another user -: assume it takes 3 secs
setTimeout(() => {
    chat1.UpdateRoom('general');
    chat1.UpdateName('Keno');

    chat1.getChats((data) =>{
        console.log(data);
    });
    chat1.addChat('Hello Mate')
}, 3000)

*/