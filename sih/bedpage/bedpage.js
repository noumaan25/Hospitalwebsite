document.addEventListener('DOMContentLoaded', function () {
    const categoryDropdown = document.getElementById('category');
    const wardDropdown = document.getElementById('ward');
    const gridContainer = document.querySelector('.grid-container');
    const wardTitle = document.getElementById('ward-title');
    const occupiedCountDisplay = document.getElementById('occupied-count');
    const totalOccupiedCountDisplay = document.getElementById('total-occupied-count');
    const deselectAllButton = document.getElementById('deselect-all');

    const wardOptions = {
        general: ['General Ward 1', 'General Ward 2', 'General Ward 3', 'General Ward 4', 'General Ward 5'],
        icu: ['ICU Ward 1', 'ICU Ward 2', 'ICU Ward 3', 'ICU Ward 4', 'ICU Ward 5'],
        pediatrics: ['Pediatrics Ward 1', 'Pediatrics Ward 2', 'Pediatrics Ward 3', 'Pediatrics Ward 4', 'Pediatrics Ward 5'],
        maternity: ['Maternity Ward 1', 'Maternity Ward 2', 'Maternity Ward 3', 'Maternity Ward 4', 'Maternity Ward 5'],
        surgery: ['Surgery Ward 1', 'Surgery Ward 2', 'Surgery Ward 3', 'Surgery Ward 4', 'Surgery Ward 5']
    };

    const SELECTION_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    let totalOccupiedCount = 0; // Total count for all wards

    function getCurrentTime() {
        return new Date().getTime();
    }

    function saveSelection(ward, selectedBeds) {
        const timestamp = getCurrentTime();
        const data = { selectedBeds, timestamp };
        localStorage.setItem(ward, JSON.stringify(data));
    }

    function getSelection(ward) {
        const storedData = localStorage.getItem(ward);
        if (storedData) {
            const data = JSON.parse(storedData);
            const timePassed = getCurrentTime() - data.timestamp;

            if (timePassed < SELECTION_EXPIRY_TIME) {
                return data.selectedBeds;
            } else {
                localStorage.removeItem(ward);
            }
        }
        return [];
    }

    function updateTotalOccupiedCount() {
        totalOccupiedCount = 0;
        Object.keys(wardOptions).forEach(category => {
            wardOptions[category].forEach(ward => {
                const selectedBeds = getSelection(ward);
                totalOccupiedCount += selectedBeds.length;
            });
        });
        totalOccupiedCountDisplay.textContent = totalOccupiedCount;
    }

    function updateWardOptions() {
        const selectedCategory = categoryDropdown.value;
        const wards = wardOptions[selectedCategory];

        wardDropdown.innerHTML = '';
        wards.forEach(ward => {
            const option = document.createElement('option');
            option.value = ward;
            option.textContent = ward;
            wardDropdown.appendChild(option);
        });

        generateBeds(wards[0]); // Generate beds for the first ward by default
    }

    function generateBeds(ward) {
        wardTitle.textContent = ward;
        gridContainer.innerHTML = ''; // Clear previous beds
        let occupiedCount = 0;
        const selectedBeds = getSelection(ward);

        for (let i = 1; i <= 36; i++) {
            const bed = document.createElement('div');
            bed.classList.add('bed');
            
            // Create an image element
            const bedImage = document.createElement('img');
            bedImage.src = '/bedpage/Hospital Bed.png'; // Replace with your image path
            bedImage.alt = 'Bed Image';
            
            // Add the bed number
            const bedNumber = document.createElement('span');
            bedNumber.textContent = i;

            // Append the image and the number to the bed div
            bed.appendChild(bedImage);
            bed.appendChild(bedNumber);

            if (selectedBeds.includes(i)) {
                bed.classList.add('red');
                occupiedCount++;
            }

            // Add click event listener for bed selection with confirmation
            bed.addEventListener('click', function () {
                const isBedSelected = bed.classList.contains('red');
                const action = isBedSelected ? 'deselect' : 'select'; // Determine if it's a select or deselect action

                // Ask for confirmation
                const userConfirmed = confirm(`Are you sure you want to ${action} bed ${i}?`);

                if (userConfirmed) {
                    if (isBedSelected) {
                        // If the bed is already selected (red) and user confirms, deselect it
                        bed.classList.remove('red');
                        occupiedCount--;
                        selectedBeds.splice(selectedBeds.indexOf(i), 1);
                    } else {
                        // If the bed is not selected and user confirms, select it
                        bed.classList.add('red');
                        occupiedCount++;
                        selectedBeds.push(i);
                    }

                    // Save the updated selection and update the UI
                    saveSelection(ward, selectedBeds);
                    occupiedCountDisplay.textContent = occupiedCount;
                    updateTotalOccupiedCount();
                }
            });

            // Append the bed to the grid container
            gridContainer.appendChild(bed);
        }

        occupiedCountDisplay.textContent = occupiedCount;
        updateTotalOccupiedCount();
    }

    // Deselect all beds in the current ward
    deselectAllButton.addEventListener('click', function () {
        const ward = wardDropdown.value;
        const selectedBeds = getSelection(ward);
        
        if (selectedBeds.length > 0) {
            const userConfirmed = confirm('Are you sure you want to deselect all beds?');

            if (userConfirmed) {
                // Clear all selected beds for the current ward
                localStorage.removeItem(ward);
                generateBeds(ward); // Regenerate beds to reflect the change
            }
        }
    });

    categoryDropdown.addEventListener('change', updateWardOptions);
    wardDropdown.addEventListener('change', () => generateBeds(wardDropdown.value));

    updateWardOptions(); // Initialize with the first category and ward
});
