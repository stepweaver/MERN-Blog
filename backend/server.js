const express = require('express');

const app = express();

//! PORT
const PORT = 5000;
//! Start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));