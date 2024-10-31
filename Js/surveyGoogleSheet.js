const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost(e) {
    const sheetId = '1IVnzoMrWkN1hSFFntdbmLgY5fDbhZvxyigiKm7ons9M';
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

    if (!e.postData.contents) {
        return createResponse(400, { status: 'error', message: 'No data provided.' });
    }

    let data;
    try {
        data = JSON.parse(e.postData.contents);
    } catch (error) {
        return createResponse(400, { status: 'error', message: 'Invalid JSON format.' });
    }

    const row = [
        data.skinProblem || "Value unavailable Al", // Default if skinProblem is missing
        (data.sources && data.sources.length > 0) ? data.sources.join(", ") : "Value unavailable" // Default if sources are missing
    ];

    // Log the row to be added for debugging
    Logger.log(row);

    // Append the row to the sheet
    try {
        sheet.appendRow(row);
        return createResponse(200, { status: 'success' });
    } catch (error) {
        Logger.log('Error appending row: ' + error);
        return createResponse(500, { status: 'error', message: 'Failed to append data.' });
    }
}
function createResponse(statusCode, content) {
    const response = ContentService.createTextOutput(JSON.stringify(content))
        .setMimeType(ContentService.MimeType.JSON);
    response.setStatusCode(statusCode);
    response.addHeader('Access-Control-Allow-Origin', 'https://funnels-build.thisisatestsiteonly.com'); // Set to your specific domain
    response.addHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
}


function doOptions(e) {
    return createResponse(204, {}); // No content response for OPTIONS
}
