document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById('amount');
    const nameInput = document.getElementById('name');
    const qrCodeContainer = document.getElementById('qrcode');
    const resetButton = document.getElementById('resetButton');

    let isAmountCleared = false; // Flag to check if the amount has been cleared

    function generateQRCode() {
        const amount = amountInput.value.trim();
        const name = nameInput.value.trim();

        if (amount && name) {
            const qrCodeData = `SPD*1.0*AM:${amount}*CC:CZK*ACC:CZ9140000000008699791200*MSG:${encodeURIComponent(name)}`;
            qrCodeContainer.innerHTML = '';
            new QRCode(qrCodeContainer, {
                text: qrCodeData,
                width: 256,
                height: 256,
            });
        }
    }

    amountInput.addEventListener('input', function() {
        // Allow only numbers and a decimal point
        amountInput.value = amountInput.value.replace(/[^0-9.]/g, '');

        // Ensure there is at most one decimal point and two decimal places
        let parts = amountInput.value.split('.');
        if (parts.length > 2) {
            amountInput.value = `${parts[0]}.${parts.slice(1).join('')}`;
        }
        if (parts[1] && parts[1].length > 2) {
            amountInput.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
        }

        generateQRCode();
    });

    amountInput.addEventListener('click', function() {
        if (!isAmountCleared) {
            amountInput.value = "";
            isAmountCleared = true;
        }
    });

    amountInput.addEventListener('blur', function() {
        // Format the value if not empty
        if (amountInput.value.trim() === "") {
            amountInput.value = "0";
        } else {
            let value = parseFloat(amountInput.value);
            if (!isNaN(value)) {
                amountInput.value = value.toFixed(2);
            }
        }
        isAmountCleared = false;
    });

    nameInput.addEventListener('input', generateQRCode);
    amountInput.addEventListener('input', generateQRCode);

    resetButton.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const amount = amountInput.value.trim();

        // Send data to the server
        fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, amount })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Display server response
            amountInput.value = "0.00"; // Set default value
            nameInput.value = "";
            qrCodeContainer.innerHTML = "";
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    });

    generateQRCode();
});
