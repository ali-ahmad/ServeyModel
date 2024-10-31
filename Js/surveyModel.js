document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showPopup, 100);
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', hidePopup);
    const optionButtons = document.querySelectorAll('input[name="option"]');
    optionButtons.forEach((button) => {
        button.addEventListener('change', handleOptionChange);
    });
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', handleSubmit);
    const submitButton1 = document.getElementById('submit-button2');
    submitButton1.addEventListener('click', handleSubmit);
    
    const skinProblemTextarea = document.getElementById('skin-problem');
    if (skinProblemTextarea) {
        skinProblemTextarea.addEventListener('input', hideError);
    }
    const checkboxes = document.querySelectorAll('#for_friend_content input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', hideError);
    });
});
function showPopup() {
    const backdrop = document.getElementById('backdrop');
    backdrop.classList.remove('hidden');
    backdrop.classList.add('visible');
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.style.animation = 'slideIn 0.5s forwards';
}
function hidePopup() {
    const backdrop = document.getElementById('backdrop');
    backdrop.classList.remove('visible');
    const popup = document.getElementById('popup');
    popup.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        backdrop.classList.add('hidden');
        popup.classList.add('hidden');
    }, 1000);
}
function handleOptionChange() {
    const forMeContent = document.getElementById('for_me_content');
    const forFriendContent = document.getElementById('for_friend_content');
    forMeContent.classList.add('hidden');
    forFriendContent.classList.add('hidden');
    
    // Update progress bar to 50%
    document.getElementById('progress-bar').style.width = '50%';

    if (this.value === 'for_me') {
        forMeContent.classList.remove('hidden');
        document.getElementById('survey').classList.add('hidden');
    } else if (this.value === 'for_friend') {
        forFriendContent.classList.remove('hidden');
        document.getElementById('survey').classList.add('hidden');
    }
}
function showError(message) {
    const errorContainer = document.getElementById('error-message');
    errorContainer.innerHTML = `<span><strong>Error</strong><em>${message}</em></span>`;
    errorContainer.classList.remove('hidden');
    errorContainer.classList.add('error-animation');
    setTimeout(() => {
        errorContainer.classList.remove('error-animation');
    }, 3000);
}
function hideError() {
    const errorContainer = document.getElementById('error-message');
    errorContainer.classList.add('hidden');
}
function handleSubmit() {
    const option = document.querySelector('input[name="option"]:checked');
    if (!option) {
        showError('Please select an option.');
        return;
    }
    
    let responses = {};
    if (option.value === 'for_me') {
        const skinProblem = document.getElementById('skin-problem');
        if (skinProblem && skinProblem.value) {
            responses = { skinProblem: skinProblem.value };
        } else {
            showError('Please provide an answer.');
            return;
        }
    } else {
        const checkboxes = document.querySelectorAll('#for_friend_content input[type="checkbox"]:checked');
        responses = { sources: Array.from(checkboxes).map((checkbox) => checkbox.value) };
        if (responses.sources.length === 0) {
            showError('Please select at least one option.');
            return;
        }
    }
    console.log(responses);
    
    // Update progress bar to 100%
    document.getElementById('progress-bar').style.width = '100%';

    document.getElementById('for_friend_content').classList.add('hidden');
    document.getElementById('for_me_content').classList.add('hidden');
    document.getElementById('survey').classList.add('hidden');
    document.getElementById('thank-you').classList.remove('hidden');
    fetch('https://script.google.com/macros/s/AKfycbxuzty_R_b-5A_vPGEX1ECkTq5mC-AJX42N78hj1V4dag1QHSvEcqA5CPUimQKsRieF/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
    })
    .then((response) => {
        if (response.ok) {
            document.getElementById('survey').classList.add('hidden');
            document.getElementById('thank-you').classList.remove('hidden');
        }
    })
    .catch((error) => console.error('Error:', error));
}
window.alert = function () {
    // Do nothing
};
function redirectPath(data) {
    if (data && Array.isArray(data) && data.length > 0) {
        const path = data[0];
        // Continue with logic using path
    } else {
        console.error('Data is undefined or empty:', data);
    }
}
const Undo = (event) => {
    const option = document.querySelector('input[name="option"]:checked');
    
    if (!option) {
        return;
    }

    if (event.dataset.btnValue === '0') {
        document.getElementById('survey').classList.remove('hidden');
        document.getElementById('survey').classList.add('slide-out');
        document.getElementById('for_friend_content').classList.add('hidden');
        document.getElementById('for_me_content').classList.add('hidden');
        const nextButton = document.querySelector('input[name="option"]:checked');
        document.getElementById('next-btn').dataset['value'] = nextButton.value;
        nextButton.addEventListener('click', handleOptionChange);
    } else if (event.dataset.value != null) {
        const forMeContent = document.getElementById('for_me_content');
        const forFriendContent = document.getElementById('for_friend_content');

        document.getElementById('survey').classList.add('hidden');
        document.getElementById('survey').classList.remove('slide-out');

        if (option.value === 'for_me') {
            forMeContent.classList.remove('hidden');
        } else if (option.value === 'for_friend') {
            forFriendContent.classList.remove('hidden');
        }
    }
};