#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log("The current directory is:", process.cwd());

// Get the command-line arguments
const [, , script] = process.argv;
const version = JSON.parse(fs.readFileSync(path.join(__dirname, "./package.json"))).version

// Define the shell script paths
const scripts = {
    version: path.join(__dirname, './shell/version.sh'),
    pull: path.join(__dirname, './shell/pulling.sh'),
    push: path.join(__dirname, './shell/pushing.sh'),
    backups: path.join(__dirname, './shell/backups.sh')
};

// Execute the corresponding shell script
const runScript = (script) => {
    const scriptPath = scripts[script];
    if (!scriptPath) {
        console.error(`Invalid script: ${script}!`);
        process.exit(1);
    }

    exec(`sh ${scriptPath} ${process.cwd()} ${version}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
};

runScript(script);
