document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    const resultContainer = document.getElementById('result-container');
    const weekdayDisplay = document.getElementById('weekday-display');
    const errorMessage = document.getElementById('error-message');

    // Handle date text input and format as DD/MM/YYYY
    dateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 8) value = value.slice(0, 8); // Max 8 digits

        let formattedValue = value;
        if (value.length > 4) {
            formattedValue = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
        } else if (value.length > 2) {
            formattedValue = value.slice(0, 2) + '/' + value.slice(2);
        }

        e.target.value = formattedValue;

        if (value.length === 8) {
            const day = parseInt(value.slice(0, 2), 10);
            const month = parseInt(value.slice(2, 4), 10);
            const year = parseInt(value.slice(4, 8), 10);

            if (isValidDate(day, month, year)) {
                dateInput.classList.remove('invalid');
                errorMessage.classList.add('hidden');

                // Pass formatted YYYY-MM-DD string to updateWeekday
                const dateString = `${year}-${value.slice(2, 4)}-${value.slice(0, 2)}`;
                updateWeekday(dateString);
            } else {
                dateInput.classList.add('invalid');
                errorMessage.classList.remove('hidden');
                resultContainer.classList.add('hidden');
            }
        } else {
            dateInput.classList.remove('invalid');
            errorMessage.classList.add('hidden');
            resultContainer.classList.add('hidden');
        }
    });


    function isValidDate(day, month, year) {
        if (month < 1 || month > 12)
            return false;

        const date = new Date(year, month - 1, day);

        if (year >= 0 && year <= 99)
            date.setFullYear(year); // Handle two-digit year edge case

        return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }

    /**
     * Calculates and updates the weekday display
     * @param {string} dateString - YYYY-MM-DD format 
     */
    function updateWeekday(dateString) {
        // We use UTC components to avoid timezone offset issues when parsing YYYY-MM-DD
        const parts = dateString.split('-');
        const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12));
        if (parts[0] >= 0 && parts[0] <= 99) date.setUTCFullYear(parts[0]);

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
