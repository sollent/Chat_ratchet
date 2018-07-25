window.onload = () => {



    let socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
        console.log("Соединение установлено.");
    };

    socket.onclose = (event) => {
        console.log("Соединение закрыто!");
    };

    let messages = [];

    socket.onmessage = (event) => {

        let user_arr = event.data.split(':');
        let user_ob = { name: user_arr[0], message: user_arr[1] };

        messages.push(user_ob);

        console.log(messages);

        let str = "";
        for(let key in messages){
            str += "<li class='me'><div class='name'><span class=''>"+ messages[key].name +"</span></div><div class='message'><p>"+ messages[key].message +"</p><span class='msg-time' style='font-size: 12px'>"+ new Date().getHours() + ":" + new Date().getMinutes() +"</span></div></li>";
            document.getElementById("content_ul").innerHTML = str;
        }
    };

    let name = localStorage.getItem("auth");
    let message;
    let button = document.getElementById("custom_button");
    button.onclick = () => {
        // name = document.getElementById("name").value;
        message = document.getElementById("message").value;
        socket.send(name + ":" + message);
        document.getElementById("message").value = "";
    };

};





if(localStorage.getItem("auth")==null){
    document.getElementById("main").style.display = "none";
    document.body.innerHTML = "<div class=\"login-page\">\n" +
        "  <div class=\"form\">\n" +
        "    <form class=\"login-form\">\n" +
        "      <input type=\"text\" id='username' placeholder=\"username\"/>\n" +
        "      <button id='send_username'>login</button>\n" +
        "    </form>\n" +
        "  </div>\n" +
        "</div>";

} else {

    document.getElementById("user_name").innerHTML = localStorage.getItem("auth");

    let array;

    let http = new XMLHttpRequest();

    http.open('GET', 'http://localhost/Chat_ratchet/src/MyApp/regist.php');
    http.send();


    http.onreadystatechange = () => {
        array = JSON.parse(http.responseText);

        if (http.readyState == 3) {
            console.log(array);

            let string;

            for(let key in array){

                console.log(array[key]);


                if (array[key].name == localStorage.getItem("auth")){
                    string = "<li class=\"item active\"><a href=\"#\"><i class=\"fa fa-user\"></i><span>"+array[key].name+"</span><i class=\"fa fa-times\"></i></a></li>\n";
                } else {
                    string = "<li><a href='#'><i class='fa fa-circle-o'></i></i><span>"+array[key].name+"</span><i class='fa fa-times'></i></a></li>";
                }

                document.getElementById("users_list").innerHTML += string;
            }
        }

    };





}

document.getElementById("send_username").onclick = () => {

    let username = document.getElementById("username").value;
    if(username==null){
        console.log('Error validate!');
    } else {
        localStorage.setItem("auth", username);

        let ajax = new XMLHttpRequest();

        ajax.open('GET', 'http://localhost/Chat_ratchet/src/MyApp/regist.php?name='+username);
        ajax.send();
        console.log(ajax.status);
    }

};

