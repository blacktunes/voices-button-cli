#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

program
  .version(`voices-button-cli ${require('../package').version}`)
  .usage('<command> [options]')

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`button <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program
  .command('create <voives-button-name>')
  .description('创建一个新的语音按钮')
  .action(name => {
    require('../lib/create')(name, process.cwd())
  })

program
  .command('voices')
  .description('根据public/voices目录生成voices.json文件')
  .option('-d, --dir', '根据文件夹自动分类')
  .action(() => {
    require('../lib/voices')(process.cwd())
  })

program.parse(process.argv)
