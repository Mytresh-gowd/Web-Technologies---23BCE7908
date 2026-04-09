// Import File System module
const fs = require('fs');

// File name
const fileName = 'sample.txt';

// 1. Create & Write File
fs.writeFile(fileName, 'Hello Mowa! This is initial content.\n', (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log('File created successfully.');

    // 2. Read File
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('\nFile Content:\n', data);

        // 3. Append Data
        fs.appendFile(fileName, 'Appended content here.\n', (err) => {
            if (err) {
                console.error('Error appending file:', err);
                return;
            }
            console.log('\nData appended successfully.');

            // 4. Read again after append
            fs.readFile(fileName, 'utf8', (err, updatedData) => {
                if (err) {
                    console.error('Error reading updated file:', err);
                    return;
                }
                console.log('\nUpdated File Content:\n', updatedData);

                // 5. Delete File
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('\nFile deleted successfully.');
                });
            });
        });
    });
});