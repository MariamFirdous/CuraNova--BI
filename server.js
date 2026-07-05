const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// web server :
app.use(express.static(__dirname));

app.listen(PORT, function() {
    console.log("Successfully running at http://localhost:" + PORT);
})