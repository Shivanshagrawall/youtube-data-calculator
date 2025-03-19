// import { dataUsage } from 'config.js';
const dataUsage = {
    "144p": 95,      // MB per hour
    "240p": 215,
    "360p": 315,
    "480p": 562.5,
    "720p": 1237.5,
    "1080p": 2250,
    "1440p": 4050,
    "4k": 8100,
    "8k": 16000
};

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const qualityRadios = document.querySelectorAll('input[name="quality"]');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const dataUsageSpan = document.getElementById('data-usage');

    calculateBtn.addEventListener('click', () => {
        const selectedQuality = document.querySelector('input[name="quality"]:checked').value;
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;

        console.log("1");

        const mbPerHour = dataUsage[selectedQuality];
        if (mbPerHour === undefined) {
            dataUsageSpan.textContent = 'N/A';
            return;
        }

        const totalMinutes = hours * 60 + minutes;
        const dataUsedMB = (mbPerHour / 60) * totalMinutes;

        dataUsageSpan.textContent = dataUsedMB.toFixed(2);
    });

    // Function to handle radio group selection visually
    function updateRadioGroupSelection() {
        const radioGroupDivs = document.querySelectorAll('.radio-group div');
        radioGroupDivs.forEach(div => {
            const radio = div.querySelector('input[type="radio"]');
            if (radio.checked) {
                div.classList.add('selected');
            } else {
                div.classList.remove('selected');
            }
        });
    }

    // Initial call to set visual state on page load
    updateRadioGroupSelection();

    // Event listener for radio group clicks to update visual state
    const radioGroupDivs = document.querySelectorAll('.radio-group div');
    radioGroupDivs.forEach(div => {
        div.addEventListener('click', () => {
            const radio = div.querySelector('input[type="radio"]');
            radio.checked = true;
            updateRadioGroupSelection(); // Update visuals when a radio is clicked via div
        });
    });

    clearBtn.addEventListener('click', () => {
        qualityRadios.forEach(radio => {
            if (radio.value === '360p') {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
        updateRadioGroupSelection(); // Update radio group visuals on clear
        hoursInput.value = '0';
        minutesInput.value = '0';
        dataUsageSpan.textContent = '0';
    });
});