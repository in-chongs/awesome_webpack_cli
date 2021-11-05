const ip = require('ip')
const chalk = require('chalk')

const divider = chalk.gray('\n-----------------')

const logger = {
  error: (err) => {
    console.log(chalk.red(err))
  },
  appStarted: (port, host, tunnelStarted) => {
    console.log(`🐶 Server started ! ${chalk.green('✓')}`)

    if (tunnelStarted) {
      console.log(`🐶 Tunnel initialized ${chalk.green('✓')}`)
    }

    console.log(`${chalk.bold('Access URLs:')}${divider}
    Localhost: ${chalk.magenta(`http://${host}:${port}`)}
    LAN: ${
      chalk.magenta(`http://${ip.address()}:${port}`) +
      (tunnelStarted ? `\n Proxy: ${chalk.magenta(tunnelStarted)}` : '')
    }${divider}
    ${chalk.blue(`Press ${chalk.italic('CTRL-c')} to stop`)}
    `)
  },
}

module.exports = logger
