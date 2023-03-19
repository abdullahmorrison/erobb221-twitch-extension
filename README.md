# BINGO Twitch Extension

A Twitch extension that lets you play a game of BINGO about a streamer.

## How Branches are Set Up

Main branch holds the template for the bingo game. The branches with streamer usernames hold the colors and board info for that streamer.

## Hiding CSS Files

If you're using VSCode, CSS files are hidden through the settings.json file in .vscode.

## Create a BINGO Game for a Streamer
You can use this template to create your own bingo game for a streamer.

1. Create an issue saying what streamer you want to create a bingo game for. I will create a branch for that streamer.
2. In the public folder, create a folder called imgs and add all the images that will be shown on the board and on the chip.
    - Make sure to name the files according to its image (ex: Kappa emote should be named Kappa.png)
3. In src/assets/board.json, edit the json to link the src of the image (ex: src: "imgs/Kappa.png") and name the alt as the name of the file (Ex: alt: "Kappa"). The title is the text that will be displayed on the board tile.
4. In src/assets/streamer.json, change the streamer.name to the name of the streamer you are making a bingo game about.
5. In src/assets/chip.json, add an image (located in public/imgs) that will be displayed on the chip and update the img field to correspond to the image (ex: src: "imgs/Kappa.png").
6. Create a pull request to the branch of your streamer.
7. I will create the extension and upload the code to Twitch.
