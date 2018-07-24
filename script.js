

let socket = new WebSocket("ws://localhost:4000");

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
        str += "<li class='me'><div class='name'><span class=''>Cucu Ionel</span></div><div class='message'><p>"+ array[key] +"</p><span class='msg-time'>5:00 pm</span></div></li>";
        document.getElementById("content_ul").innerHTML = str;
    }
};

// let name;
let message;
let button = document.getElementById("custom_button");
button.onclick = () => {
    // name = document.getElementById("name").value;
    message = document.getElementById("message").value;
    socket.send(message);
    document.getElementById("message").value = "";
};


