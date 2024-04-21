#!/usr/bin/env node

const { exec } = require('child_process');

console.log("The current directory is:", process.cwd());

// Get the command-line arguments
const [, , script] = process.argv;

// Define the shell script paths
const scripts = {
    pull: './shell/pulling.sh',
    push: './shell/pushing.sh',
    backups: './shell/backups.sh',
};

// Execute the corresponding shell script
const runScript = (script) => {
    const scriptPath = scripts[script];
    if (!scriptPath) {
        console.error(`Invalid script: ${script}!`);
        process.exit(1);
    }

    exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
};

runScript(script);
