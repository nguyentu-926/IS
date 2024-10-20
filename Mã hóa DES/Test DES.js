// Tạo khóa tự động
document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const key = CryptoJS.lib.WordArray.random(64 / 8).toString();
    document.getElementById('encryptionKey').value = key;
});

// Mã hóa văn bản hoặc tệp
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const key = document.getElementById('encryptionKey').value;

    if (!key) {
        alert("Vui lòng tạo hoặc nhập khóa.");
        return;
    }

    // Mã hóa văn bản
    if (plaintext) {
        const encrypted = CryptoJS.DES.encrypt(plaintext, key);
        document.getElementById('ciphertext').value = encrypted.toString();
    }

    // Mã hóa tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            const encrypted = CryptoJS.DES.encrypt(fileContent, key);

            // Tạo file mã hóa mới
            const blob = new Blob([encrypted.toString()], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `encrypted_${fileInput.name}`;
            a.click();
        };
        reader.readAsText(fileInput);
    }

    if (!plaintext && !fileInput) {
        alert("Vui lòng nhập văn bản hoặc chọn tệp để mã hóa.");
    }
});

// Giải mã văn bản hoặc tệp
document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const key = document.getElementById('decryptionKey').value;

    if (!key) {
        alert("Vui lòng nhập khóa giải mã.");
        return;
    }

    // Giải mã văn bản
    if (ciphertext) {
        const decrypted = CryptoJS.DES.decrypt(ciphertext, key);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

        if (!plaintext) {
            alert("Giải mã thất bại. Khóa không đúng hoặc bản mã bị sai.");
        } else {
            document.getElementById('decryptedText').value = plaintext;
        }
    }

    // Giải mã tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const encryptedContent = event.target.result;
            const decrypted = CryptoJS.DES.decrypt(encryptedContent, key);
            const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

            if (!plaintext) {
                alert("Giải mã thất bại. Khóa không đúng hoặc file bị sai.");
            } else {
                // Tạo file giải mã mới
                const blob = new Blob([plaintext], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `decrypted_${fileInput.name}`;
                a.click();
            }
        };
        reader.readAsText(fileInput);
    }

    if (!ciphertext && !fileInput) {
        alert("Vui lòng nhập bản mã hoặc chọn tệp để giải mã.");
    }
});

// Lưu bản rõ
document.getElementById('saveBtn').addEventListener('click', function() {
    const clearText = document.getElementById('decryptedText').value;
    const blob = new Blob([clearText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decryptedText.txt";
    link.click();
});

// Xóa nội dung
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptionKey').value = '';
    document.getElementById('decryptedText').value = '';
    document.getElementById('fileInput').value = null;
});
