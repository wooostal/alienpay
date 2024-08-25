const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Slouží statické soubory z adresáře 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
