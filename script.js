document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    const resultContainer = document.getElementById('result-container');
    const weekdayDisplay = document.getElementById('weekday-display');

    // Handle date change
    dateInput.addEventListener('change', (e) => {
        const selectedDate = e.target.value;

        if (selectedDate) {
            updateWeekday(selectedDate);
        } else {
            resultContainer.classList.add('hidden');
        }
    });

    /**
     * Calculates and updates the weekday display
     * @param {string} dateString - YYYY-MM-DD format 
     */
    function updateWeekday(dateString) {
        // We use UTC components to avoid timezone offset issues when parsing YYYY-MM-DD
        const parts = dateString.split('-');
        const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12));

        // Format to get the full weekday name
        const options = { weekday: 'long' };
        const weekdayName = new Intl.DateTimeFormat('en-US', options).format(date);

        // Show result with a slight delay for better feel
        resultContainer.classList.remove('hidden');

        // Add a small animation effect
        weekdayDisplay.style.opacity = '0';
        weekdayDisplay.style.transform = 'translateY(10px)';

        setTimeout(() => {
            weekdayDisplay.textContent = weekdayName;
            weekdayDisplay.style.opacity = '1';
            weekdayDisplay.style.transform = 'translateY(0)';
            weekdayDisplay.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 50);
    }
});
