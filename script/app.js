//dom queries
const chatlist = document.querySelector('.chat-list');


//Class instances
const chatui = new ChatUI(chatlist);


const chat1 = new Chatroom('general', 'kev');

//Get Chats and render it to html page
chat1.getChats(data =>{
    chatui.render(data);
});