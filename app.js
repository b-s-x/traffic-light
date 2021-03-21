const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs');

process.env.NODE_ENV == 'development'

const port = process.env.PORT || '8000'

app.use(express.static(`${__dirname}/dist`))


app.use('*', (req, res) => {
  const indexPath = path.resolve(__dirname, './dist/index.html');
  const fileContent = fs.readFileSync(indexPath)

  res.send(fileContent.toString()).end();
});

app.listen(port, () => {
  console.log(`Server working on http://localhost:${port}` );
})
