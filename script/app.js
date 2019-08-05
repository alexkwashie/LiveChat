//dom queries
const chatlist = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');



newChat.addEventListener('submit', e =>{
    e.preventDefault();
    
    const message = newChat.message.value.trim();

    //1.bare in mind that the whole page has runned already, so can use (chat1) instance from below
    //2. the addChat method is and async func that returns a promise, so can use the *'.then.catch method'
    chat1.addChat(message)
    .then(()=> newChat.reset()) //clear the field after submiting
    .catch(err =>console.log(err));

    chat1.UpdateName(storedName);
});

//Update username
newName.addEventListener('submit', e=>{
    e.preventDefault();

    const name = newName.username.value;

    localStorage.setItem('username', name);

    storedName = localStorage.getItem('username');

    console.log(storedName);
    

});



//Class instances
const chatui = new ChatUI(chatlist); //used to add to <li> tags

const chat1 = new Chatroom('gaming', 'kev');



//Get Chats and render it to html page
chat1.getChats(data =>{
    chatui.render(data);
});
