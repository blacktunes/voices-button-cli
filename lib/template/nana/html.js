const inquirer = require('inquirer')
const { log } = require('../../log')

module.exports = async function (check, name) {
  let title = name
  let keywords = ''
  let description = ''

  if (check) {
    log()
    log('index.html设置:')
    const htmlSetting = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'index.html的title:',
        default: name
      },
      {
        name: 'keywords',
        type: 'input',
        message: 'index.html的keywords(请用半角逗号分隔):',
        default: ''
      },
      {
        name: 'description',
        type: 'input',
        message: 'index.html的description:',
        default: ''
      }
    ])
    title = htmlSetting.title
    keywords = htmlSetting.keywords
    description = htmlSetting.description
  }

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>${title}</title>${keywords ? `\n    <meta name="keywords" content="${keywords}">` : ''}${description ? `\n    <meta name="description" content="${description}">` : ''}
  </head>
  <body>
    <noscript>
      <strong>We're sorry but ${title} doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
`
}