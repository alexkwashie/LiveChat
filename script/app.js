//dom queries
const chatlist = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const UpdateNameUI = document.querySelector('.updatename');
const chatRooms = document.querySelector('.chat-rooms');


//Send message to database
newChat.addEventListener('submit', e =>{
    e.preventDefault();

    const message = newChat.message.value.trim();

    //1.bare in mind that the whole page has runned already, so can use (chat1) instance from below
    //2. the addChat method is and async func that returns a promise, so can use the *'.then.catch method'
    chat1.addChat(message)
    .then(()=> newChat.reset()) //clear the field after submiting
    .catch(err =>console.log(err));
});


//Update username
newName.addEventListener('submit', e=>{
    e.preventDefault();

    const name = newName.username.value;

    newName.reset();
    const showName = chat1.UpdateName(name);

    UpdateNameUI.innerHTML = "Name has been Updated";

    setTimeout(() => {
        UpdateNameUI.innerHTML = "";
    }, 3000);

});


//Update chat Room
chatRooms.addEventListener('click', e =>{
    if(e.target.tagName === 'BUTTON'){
        chatui.clear();
        chat1.UpdateRoom(e.target.getAttribute('id')) //set updatedRoom arg with the buttons id name
        chat1.getChats(data =>{
            chatui.render(data);
        });
    }

})


//Class instances
const chatui = new ChatUI(chatlist); //used to add to <li> tags


//Saving updated name in LocalStorage
let SavedName = localStorage.getItem('username');

if(!SavedName){
    SavedName = 'Anonymous';
}else{
    SavedName;
}

//class instance
const chat1 = new Chatroom('general', SavedName);



//Get Chats and render it to html page
chat1.getChats(data =>{
    chatui.render(data);
});
