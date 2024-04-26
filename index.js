// index.js
const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const app = express();
const port = 3000;

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

const sqlite3 = require('sqlite3').verbose(); // Import SQLite module

// API endpoint for uploading Excel file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Variables to keep track of insertion counts by column2Value
    const insertionCounts = {
        'new_license': 0,
        'account_request': 0,
        'inspection_request': 0,
        'add_new_activity': 0,
        'stamp_license_letter': 0
    };

    // Start time
    const startTime = new Date();
	
	const db = new sqlite3.Database(':memory:'); // Use in-memory database for this example

    // Read Excel file
    const workbook = new exceljs.Workbook();
    workbook.xlsx.readFile(req.file.path)
        .then(() => {
            const worksheet = workbook.getWorksheet(1);
            const columns = []; // Store column names
            let rowNumber = 0; // Track row number
            
            worksheet.eachRow({ includeEmpty: true }, (row) => {
                rowNumber++;
                if (rowNumber > 1) {
                    // Start processing from the second row
                    const column2Value = row.getCell(2).value;
                    if (column2Value === 1 || column2Value === 2 || column2Value === 3 || column2Value === 4 || column2Value === 5) {
                        // Increment insertion count for the corresponding column2Value
                        
						if (column2Value === 1)
						insertionCounts['new_license']++;
				        else if (column2Value === 2)
						insertionCounts['account_request']++;
						else if (column2Value === 3)
							insertionCounts['inspection_request']++;
						else if (column2Value === 4)
							insertionCounts['add_new_activity']++;
						else if (column2Value === 5)
							insertionCounts['stamp_license_letter']++;
                        
                     
                    if (column2Value === 1) {
                        // Handle column 2 value equal to 1
                        const jsonObject = JSON.parse(row.getCell(4).value);
                        const sql = `INSERT INTO new_license (CompanyName, LicenceType, IsOffice, OfficeName, OfficeServiceNumber, RequestDate, Activities) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                        const values = [
                            jsonObject.CompanyName,
                            jsonObject.LicenceType,
                            jsonObject.IsOffice,
                            jsonObject.OfficeName,
                            jsonObject.OfficeServiceNumber,
                            jsonObject.RequestDate,
                            jsonObject.Activities
                        ];
                        db.query(sql, values, (err, result) => {
                            if (err) throw err;
                            console.log(`Inserted ${result.affectedRows} row(s)`);
                        });
                    } else if (column2Value === 2) {
                        // Handle column 2 value equal to 2
                        const jsonObject = JSON.parse(row.getCell(4).value);
                        const sql = `INSERT INTO account_request (CompanyName, RequesterName, ApplicantName, UserName, ContactEmail, Permissions) VALUES (?, ?, ?, ?, ?, ?)`;
                        const values = [
                            jsonObject.CompanyName,
                            jsonObject.RequesterName,
                            jsonObject.ApplicantName,
                            jsonObject.UserName,
                            jsonObject.ContactEmail,
                            jsonObject.Permissions.join(',')
                        ];
                        db.query(sql, values, (err, result) => {
                            if (err) throw err;
                            console.log(`Inserted ${result.affectedRows} row(s)`);
                        });
                    } else if (column2Value === 3) {
                        // Handle column 2 value equal to 3
                        const jsonObject = JSON.parse(row.getCell(4).value);
                        const sql = `INSERT INTO inspection_request (CompanyName, InspectionDate, InspectionTime, InspectionType) VALUES (?, ?, ?, ?)`;
                        const values = [
                            jsonObject.CompanyName,
                            jsonObject.InspectionDate,
                            jsonObject.InspectionTime,
                            jsonObject.InspectionType
                        ];
                        db.query(sql, values, (err, result) => {
                            if (err) throw err;
                            console.log(`Inserted ${result.affectedRows} row(s)`);
                        });
                    } else if (column2Value === 4) {
                        // Handle column 2 value equal to 4
                        const jsonObject = JSON.parse(row.getCell(4).value);
                        const sql = `INSERT INTO add_new_activity (CompanyName, LicenceID, Activities) VALUES (?, ?, ?)`;
                        const values = [
                            jsonObject.CompanyName,
                            jsonObject.LicenceID,
                            jsonObject.Activities.join(',')
                        ];
                        db.query(sql, values, (err, result) => {
                            if (err) throw err;
                            console.log(`Inserted ${result.affectedRows} row(s)`);
                        });
                    } else if (column2Value === 5) {
                        // Handle column 2 value equal to 5
                        const jsonObject = JSON.parse(row.getCell(4).value);
                        const sql = `INSERT INTO stamp_license_letter (CompanyName, LicenceID, RequestDate) VALUES (?, ?, ?)`;
                        const values = [
                            jsonObject.CompanyName,
                            jsonObject.LicenceID,
                            jsonObject.RequestDate
                        ];
                        db.query(sql, values, (err, result) => {
                            if (err) throw err;
                            console.log(`Inserted ${result.affectedRows} row(s)`);
                        });
                    }
                    // Add more else if blocks as needed for additional conditions
                    }
                }
            });

            // End time
            const endTime = new Date();

            // Calculate total time elapsed
            const totalTimeElapsed = endTime - startTime;

            // Send response with insertion counts and total time elapsed
            res.send(`File uploaded and data saved to database.\nInsertion counts by column2Value: ${JSON.stringify(insertionCounts)}\nTotal time elapsed: ${totalTimeElapsed} milliseconds`);
        })
        .catch((err) => {
            console.log('Error:', err);
            res.status(500).send('Error processing file.');
        })
		.finally(() => {
            // Close SQLite database connection
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Closed the database connection.');
            });
        });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

