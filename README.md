# Screeps Game Code

Here is my code for the [Screeps](https://screeps.com) game. I decided to make this a public repository so my friends and I can bounce ideas off each other.

Seeing as the Screeps game doesn't support directories I decided to create my own simple build script which will find any `*.js` files in the `src` directory and flatten them out into the `dist` directory which is what the Screeps game will use.

At some point I'd like to find some pre-existing tool that allows for the use of **TypeScript** and **ES6** however I'm keeping things simple for now.

## Usage

Run the build script in your terminal:

```
sh build.sh
```

A `dist` directory should now exist in the project directory which contains the flattened out **JavaScript** files that you can use with the Screeps game.

At this point you could copy and paste these files into the directory the Screeps game is reading from but that's a lot of effort.

### Create a Symbolic Link

Alternatively you can create a symbolic link so you won't need to copy and paste each time you re-build the source files.

This is how I created a Symbolic Link on Windows:

#### Command Prompt (Administrator)
```
mklink /D "C:\Users\<USER>\AppData\Local\Screeps\scripts\screeps.com\<BRANCH>" "C:\Users\<USER>\dev\screeps\dist"
```

Make sure to replace `<USER>` and `<BRANCH>` appropriately and modify the **Target** path _(the second argument)_ to reference the `dist` directory where you have cloned this repository.

## Automated Build (with VS Code)

Simply install the [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) VS Code Extension and that's it!

The configuration has already been setup for you. Each time you save a **JavaScript** file within this project then the `build.sh` script will automatically get executed. You can find the workspace configuration for **Run on Save** in `.vscode/settings.json`.
