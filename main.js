const prompts = require('prompts');
const { scripts, run } = require('./function/runner');

let start = async () => {
    try {
        let { command } = await prompts({
            type: 'text',
            name: 'command',
            message: 'So what do we do 🤓️️️️️️?',
            validate: value => !scripts[value] ? "This command was not found, see `help'." : true
        })

        await run(command, [])
    } catch (err) {
        console.log(`Message: ${err.message}, ErrorCode: 0000.`)
        process.exit(1)
    }
}

start()