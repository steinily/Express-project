const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

app.set('view engine' , 'hbs');
app.set('views', path.join(__dirname ,'views'));

const friendsRouter = require('./routes/friends.router')
const messagesRouter = require('./routes/messages.route')

app.use(express.json()); 

app.use((req,res,next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use('/site' , express.static(path.join(__dirname, 'public')));
app.use('/friends', friendsRouter)
app.use('/messages' , messagesRouter)
app.get('/', (req,res) =>{
    res.render('index.hbs', {
        title : ' My friend very clever' ,
        caption : 'Experss'
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port :  ${PORT} ...`)
});