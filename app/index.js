    // index.js
    const express = require('express');
    const app = express();
    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
        res.send(`Hello World!\nGuess what day ${genRandomDate()} is!`);
    });

    function genRandomDate() {
        const start = new Date(1582, 10, 15); // Start date: October 15, 1582, when the Gregorian calendar was adopted
        const temp_now = new Date();

        // Create a date as far into the future as the adoption of the Gregorian calendar was in the past
        const end = new Date(temp_now.getTime() + (temp_now.getTime() - start.getTime()));
        const randTimeStamp = Math.random() * (end.getTime() - start.getTime());
        const randomDate = new Date(randTimeStamp);

        return randomDate.toLocaleDateString('en-US');
    }

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
