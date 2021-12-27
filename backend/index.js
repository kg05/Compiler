const express = require('express');
const { executeCpp } = require('./executeCpp');
const {generateFile} = require('./generateFile');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({"hello" : "world!"});
});

app.post("/run", async (req, res) => {
    const {language = "cpp", code} = req.body;

    if(code === undefined){
        return res.status(400).json({success: false, error : "Empty code body"});
    }
    try{
        const filepath = await generateFile(language, code);
        const output = await executeCpp(filepath);
        console.log("Output = ", output);
        return res.json({filepath, output});
    } catch(err){
        res.status(500).json({err});
    }
})



const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);