const getHomePage = (req, res) => {
  res.send('Hello World!!!')
}

const getCheckVar = (req, res) => {
  res.render('sample.ejs')
}

module.exports = {
  getHomePage,
  getCheckVar
}
