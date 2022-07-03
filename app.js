const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const list_id = "3cc9363923";
    const url = `https://us8.api.mailchimp.com/3.0/lists/${list_id}`;

    const options = {
        method: "POST",
        auth: "maria1:b032ee400e2d5bf59fa0a3b18059f054"
    }


    const request = https.request(url, option, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
    


})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Api key
// b032ee400e2d5bf59fa0a3b18059f054-us8
//Audience ID
// 3cc9363923