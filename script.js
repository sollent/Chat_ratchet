

let socket = new WebSocket("ws://178.159.46.168:4000");

socket.onopen = () => {
    console.log("Соединение установлено.");
};

socket.onclose = (event) => {
    console.log("Соединение закрыто!");
};

let array = [];

socket.onmessage = (event) => {

    array.push(event.data);
    console.log(array);
    let str = "";
    for(let key in array){
        str += "<p class='message_p'>"+array[key]+"</p>";
        document.getElementsByClassName("big_card")[0].innerHTML = str;
    }
};

let name;
let message;
let button = document.getElementById("custom_button");
button.onclick = () => {
    name = document.getElementById("name").value;
    message = document.getElementById("message").value;
    socket.send(name + ": "+message);
    document.getElementById("message").value = "";
};


