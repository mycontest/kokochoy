#!/usr/bin/env node

const { exec } = require('child_process');

// Get the command-line arguments
const [, , script] = process.argv;

// Define the shell script paths
const scripts = {
    pull: './shell/pulling.sh',
    push: './shell/pushing.sh',
    backups: './shell/pushing.sh'
};

// Execute the corresponding shell script
const runScript = (script) => {
    const scriptPath = scripts[script];
    if (!scriptPath) {
        console.error(`Invalid script: ${script}`);
        process.exit(1);
    }

    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
};

runScript(script);
