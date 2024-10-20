// Tạo khóa tự động
document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const randomKey = CryptoJS.lib.WordArray.random(32 / 8).toString(); // Tạo khóa ngẫu nhiên 32 ký tự
    document.getElementById('encryptionKey').value = randomKey;
});

// Mã hóa văn bản bằng AES
function aesEncrypt(plaintext, key) {
    const paddedKey = CryptoJS.enc.Utf8.parse(key.padEnd(32, ' ')); // Đảm bảo khóa có độ dài 32 ký tự
    const encrypted = CryptoJS.AES.encrypt(plaintext, paddedKey);
    return encrypted.toString();
}

// Giải mã văn bản bằng AES
function aesDecrypt(ciphertext, key) {
    const paddedKey = CryptoJS.enc.Utf8.parse(key.padEnd(32, ' ')); // Đảm bảo khóa có độ dài 32 ký tự
    const decrypted = CryptoJS.AES.decrypt(ciphertext, paddedKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Mã hóa văn bản hoặc tệp
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const key = document.getElementById('encryptionKey').value;

    // Kiểm tra khóa
    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
        alert("Khóa mã hóa phải có độ dài 16, 24 hoặc 32 ký tự.");
        return;
    }

    // Mã hóa văn bản
    if (plaintext) {
        const encrypted = aesEncrypt(plaintext, key);
        document.getElementById('ciphertext').value = encrypted;
    }

    // Mã hóa tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            const encrypted = aesEncrypt(fileContent, key);

            // Tạo file mã hóa mới
            const blob = new Blob([encrypted], { type: "text/plain" });
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

    // Kiểm tra khóa
    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
        alert("Khóa giải mã phải có độ dài 16, 24 hoặc 32 ký tự.");
        return;
    }

    // Giải mã văn bản
    if (ciphertext) {
        const decrypted = aesDecrypt(ciphertext, key);
        document.getElementById('decryptedText').value = decrypted;
    }

    // Giải mã tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const encryptedContent = event.target.result;
            const decrypted = aesDecrypt(encryptedContent, key);
            // Tạo file giải mã mới
            const blob = new Blob([decrypted], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `decrypted_${fileInput.name}`;
            a.click();
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
