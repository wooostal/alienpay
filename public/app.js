document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById('amount');
    const nameInput = document.getElementById('name');
    const qrCodeContainer = document.getElementById('qrcode');
    const resetButton = document.getElementById('resetButton');
    let isValueCleared = false; // Flag to track if value has been cleared

    function generateQRCode() {
        const amount = amountInput.value.trim();
        const name = nameInput.value.trim();

        if (amount && name) {
            const qrCodeData = `Amount: ${amount} CZK\nName: ${name}`;
            qrCodeContainer.innerHTML = '';
            new QRCode(qrCodeContainer, {
                text: qrCodeData,
                width: 256,
                height: 256,
            });
        }
    }

    amountInput.addEventListener('input', function() {
        // Allow only numbers
        amountInput.value = amountInput.value.replace(/[^0-9]/g, '');
        generateQRCode();
    });

    amountInput.addEventListener('focus', function() {
        // Clear the value when focusing if it's not already cleared
        if (!isValueCleared) {
            amountInput.value = "";
            isValueCleared = true;
        }
    });

    amountInput.addEventListener('blur', function() {
        // If empty, set to "0"
        if (amountInput.value.trim() === "") {
            amountInput.value = "0";
        }
        isValueCleared = false; // Reset the flag when the field loses focus
    });

    nameInput.addEventListener('input', generateQRCode);

    resetButton.addEventListener('click', function() {
        amountInput.value = "0";
        nameInput.value = "";
        qrCodeContainer.innerHTML = "";
    });

    generateQRCode();
});
