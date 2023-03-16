This extension allows users to play a bingo game about the streamer (STREAMER).

I submitted an Obfuscation Intake Request form because the build is not human-readable. The ZIP file attached to that form is the extension code.

The overlay uses a built-in chatbot to display the bingo board.

Chatbot Commands:

- !bingo: opens the overlay bingo board

Allowlist explanations:

- wss://irc-ws.chat.twitch.tv:443, ws://irc-ws.chat.twitch.tv:80, irc://irc.chat.twitch.tv:6667, irc://irc.chat.twitch.tv:6697: urls the the chatbot connects to.

Start the application locally:

- Enable allow invalid certificates for resources loaded from localhost in Chrome: chrome://flags/#allow-insecure-localhost
- In the terminal run npm install, then npm start

Testing the Extension:

- Click on the question mark button to view how to play the game
- Click on a tile to add a chip
- Win (bingo) by filling a row, column, or diagonal with chips
