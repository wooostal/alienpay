document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById('amount');
    const nameInput = document.getElementById('name');
    const qrCodeContainer = document.getElementById('qrcode');
    const resetButton = document.getElementById('resetButton');

    function formatAmount(value) {
        let number = parseFloat(value.replace(',', '.'));
        if (!isNaN(number)) {
            return number.toFixed(2).replace('.', ',');
        }
        return "0,00";
    }

    function generateQRCode() {
        const amount = formatAmount(amountInput.value.trim());
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

    function handleAmountInput() {
        let inputValue = amountInput.value.trim();

        // Allow only numbers and commas
        let validValue = inputValue.replace(/[^0-9,]/g, '');

        // Ensure correct decimal format
        let formattedValue = formatAmount(validValue);

        // Set the value and maintain cursor position
        const cursorPosition = amountInput.selectionStart;
        amountInput.value = formattedValue;
        amountInput.setSelectionRange(cursorPosition, cursorPosition); // Reset cursor position

        generateQRCode();
    }

    // Event listener to format the amount on input
    amountInput.addEventListener('input', handleAmountInput);

    // Event listener to reset amount on blur if empty
    amountInput.addEventListener('blur', function() {
        if (amountInput.value.trim() === "") {
            amountInput.value = "0,00";
        }
    });

    // Event listener for name input
    nameInput.addEventListener('input', generateQRCode);

    // Event listener for reset button
    resetButton.addEventListener('click', function() {
        amountInput.value = "0,00";
        nameInput.value = "";
        qrCodeContainer.innerHTML = "";
    });

    // Event listener to clear the amount field on click
    amountInput.addEventListener('click', function() {
        if (amountInput.value === "0,00") {
            amountInput.value = "";
        }
    });

    // Initial QR code generation
    generateQRCode();
});
