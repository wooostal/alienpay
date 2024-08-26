document.addEventListener("DOMContentLoaded", function() {
    const amountInput = document.getElementById('amount');
    const nameInput = document.getElementById('name');
    const qrCodeContainer = document.getElementById('qrcode');
    const resetButton = document.getElementById('resetButton');

    function formatAmount(value) {
        // Převést hodnotu na číslo s dvěma desetinnými místy
        let number = parseFloat(value);
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

    amountInput.addEventListener('input', function() {
        // Udržujte správný formát s dvěma desetinnými místy
        let validValue = amountInput.value.replace(/[^0-9.]/g, '');

        // Ujistěte se, že je maximálně jedno desetinné místo
        if (validValue.includes('.')) {
            const parts = validValue.split('.');
            if (parts[1].length > 2) {
                validValue = `${parts[0]}.${parts[1].substring(0, 2)}`;
            }
        }

        // Nastavte hodnotu s opravou pozice kurzoru
        amountInput.value = validValue;
        generateQRCode();
    });

    amountInput.addEventListener('focus', function() {
        // Při kliknutí vymažte předchozí hodnotu
        amountInput.value = "";
    });

    amountInput.addEventListener('blur', function() {
        // Pokud je prázdné, nastavte na "0.00"
        if (amountInput.value.trim() === "") {
            amountInput.value = "0.00";
        }
    });

    nameInput.addEventListener('input', generateQRCode);

    resetButton.addEventListener('click', function() {
        amountInput.value = "0.00";
        nameInput.value = "";
        qrCodeContainer.innerHTML = "";
    });

    generateQRCode();
});
