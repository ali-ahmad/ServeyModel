# Survey Pop-Up Project

## Overview
This project implements a survey pop-up on a thank-you page that appears 5 seconds after the user lands on the page. The survey collects responses based on the user's selection and saves the data in real-time to a Google Sheet.

## Features
- **Dynamic Questions**: The survey adjusts based on user input.
  - First question: "Did you buy this for you or for a friend?" (Options: For me, For a friend)
  - Second question:
    - If "For me" is selected: "What skin problems do you want to solve?" (Open-ended)
    - If "For a friend" is selected: "Where did you see ads for this product?" (Multi-select options: Facebook, YouTube, Email, TikTok)
- **Progress Bar**: A visual progress indicator shows the user how far along they are in the survey.
- **Real-time Data Collection**: Responses are saved to a Google Sheet using a PHP backend.
- **User Experience**: A smooth and responsive design with a friendly thank-you message displayed after survey submission.

## File Structure
- `thank_you.html`: The main HTML file containing the structure for the thank-you page and the survey pop-up.
- `styles.css`: CSS file for styling the pop-up, progress bar, and overall page.
- `script.js`: JavaScript file that handles the display of the pop-up and manages user interactions.
- `submit.php`: PHP file that processes the survey responses and saves them to the Google Sheet.

## Setup Instructions
1. **Google Sheets Setup**:
   - Create a Google Sheet to store responses.
   - Enable the Google Sheets API and create a script to handle POST requests.

2. **Local Development**:
   - Place all files in a local server environment (e.g., XAMPP, MAMP).
   - Update the URL in `script.js` to point to the `submit.php` file.

3. **Accessing the Thank-You Page**:
   - Open `thank_you.html` in a web browser to test the functionality.

## Usage
1. Wait for 5 seconds after landing on the thank-you page.
2. Respond to the survey questions as prompted.
3. A progress bar will visually indicate the completion of the survey.
4. Upon submission, responses will be recorded in the specified Google Sheet.

## Future Improvements
- Implement validation for user input.
- Enhance styling for better user experience.
- Include analytics to track survey responses.

## Links
- [Link to Google Sheet](insert-your-google-sheet-link-here)
