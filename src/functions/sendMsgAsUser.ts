const login = require("facebook-chat-api");

export function sendMsgAsUser() {
    // Create simple echo bot
    login({email: "hagaimishali@gmail.com", password: "hm46872471"}, (err, api) => {
        if(err) return console.error(err);

        api.listen((err, message) => {
            api.sendMessage("תודה", message.threadID);
        });
    });
}

