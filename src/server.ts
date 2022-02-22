import express from 'express';

const port = process.env.PORT || 5000;

const app = express();

app.get('/',(req, res) => {
    res.send('API is running...');
});

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
})