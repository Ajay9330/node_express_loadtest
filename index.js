const fs = require("fs");
const path = require("path");

function generateHtmlFile(n) {
    const targetSizeInBytes = n * 1024 * 1024;
    const fileName = `generated_${n}MB.html`;
    const filePath = path.join(__dirname, fileName);
    const writeStream = fs.createWriteStream(filePath);
    const content = "<div>This is a large HTML file generated by Node.js.</div>\n";
    const contentLength = Buffer.byteLength(content, 'utf8');
    let currentSize = 0;

    writeStream.write("<!DOCTYPE html>\n<html>\n<head>\n<title>Large HTML File</title>\n</head>\n<body>\n");
    currentSize += Buffer.byteLength("<!DOCTYPE html>\n<html>\n<head>\n<title>Large HTML File</title>\n</head>\n<body>\n", 'utf8');

    let i = 0;
    while (currentSize < targetSizeInBytes) {
        const remainingSize = targetSizeInBytes - currentSize;
        const chunksToAdd = Math.min(Math.floor(remainingSize / contentLength), 50);
        writeStream.write(content.repeat(chunksToAdd));
        currentSize += contentLength * chunksToAdd;
        if (currentSize % (1024 * 100) < contentLength) {
            console.log(`Current size: ${currentSize} bytes (${(currentSize / (1024 * 1024)).toFixed(2)} MB)`);
        }
        if (chunksToAdd === 0) {
            break;
        }
    }

    writeStream.write("</body>\n</html>");
    writeStream.end(() => {
        console.log(`File generated successfully at: ${filePath}`);
    });
}

function generateFilesInRange(a, b) {
    for (let i = a; i <= b; i++) {
        generateHtmlFile(i);
    }
}

const sizeInMB = 10;
generateHtmlFile(sizeInMB);

const startSize = 5;
const endSize = 8;
generateFilesInRange(startSize, endSize);
