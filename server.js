const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');

const app = express();

app.set('PORT', process.env.PORT || 5000);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//mongodb+srv://admin:n4tI7wwGSMOiQURw@cluster0.jorqq.mongodb.net/blog?retryWrites=true&w=majority

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(app.get('PORT'), function () {
  console.log('Node is runiing');
});
