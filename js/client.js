const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinp.Value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinp.Value = "";
})

const name = prompt("Enter Your Name To Join ");
socket.emit('new-user-joined',name);

socket.on('user-joined', name => {
append(`${name} Joined The Chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
 })

 
socket.on('left', name => {
    append(`${data.name} left The Chat`, 'left')
 })