const { execSync } = require('child_process');
const { exit } = require('./others');
const path = require('path');
const fs = require('fs');

let scripts = {
    pull: { type: "shell", command: path.join(__dirname, '../shell/pull.sh') },
    push: { type: "shell", path: path.join(__dirname, '../shell/push.sh') },
    backups: { type: "shell", path: path.join(__dirname, '../shell/backups.sh') },
    version: { type: "shell", path: path.join(__dirname, '../shell/version.sh') },
    exit: { type: "function", func: exit }
}

const run = async (name, params = []) => {
    try {
        let command = scripts[name];
        if (!command) throw new Error(`Invalid script: ${name}!`);

        // Choose type
        if (command.type === "shell") await shell(command.path, params);
        if (command.type === "function") await command.func();

    } catch (err) {
        console.error(`Message: ${err.message}, ErroCode: 0001`);
        process.exit(1)
    }
}

const shell = async (path, params = []) => {
    try {
        let result = execSync(`sh ${path} ${params.join(" ")}`);
        console.log(result.toString());
    } catch (error) {
        console.error(`Message: ${error.message}, ErroCode: 0002`);
        process.exit(1)
    }
}

module.exports = { run, scripts };
