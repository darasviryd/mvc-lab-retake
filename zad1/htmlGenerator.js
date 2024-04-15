// htmlGenerator.js

const htmlGenerator = {
    getHTMLDocumentStart: function() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cars</title>
</head>`;
    }
};

module.exports = htmlGenerator;
