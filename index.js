const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-uhw118g7t5oloYJDbwTnnDGC",
    apikey:"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",

});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:`You are a console terminal, answer as if 
        you are receiving commands from a user.> ${message}?#`,
        max_tokens: 100,
        temperature: 0,
    });
   
    console.log(response.data)
    if(response.data.choices[0].text){
        res.json({message: response.data.choices[0].text})
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`)

})