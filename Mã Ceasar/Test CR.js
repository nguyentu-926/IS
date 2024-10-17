// Hàm mã hóa văn bản bằng mã Caesar
function caesarEncrypt(plaintext, shift) {
    return plaintext.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            const base = char.charCodeAt(0) >= 97 ? 97 : 65; // 97 là 'a', 65 là 'A'
            return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
        }
        return char; // Không mã hóa ký tự không phải là chữ cái
    }).join('');
}

// Hàm giải mã văn bản bằng mã Caesar
function caesarDecrypt(ciphertext, shift) {
    return caesarEncrypt(ciphertext, 26 - (shift % 26)); // Giải mã bằng cách mã hóa với (26 - shift)
}

// Mã hóa văn bản hoặc tệp
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const shift = parseInt(document.getElementById('encryptionKey').value);

    // Kiểm tra khóa
    if (isNaN(shift) || shift < 0 || shift > 25) {
        alert("Vui lòng nhập khóa (số dịch) hợp lệ từ 0 đến 25.");
        return;
    }

    // Mã hóa văn bản
    if (plaintext) {
        const encrypted = caesarEncrypt(plaintext, shift);
        document.getElementById('ciphertext').value = encrypted;
    }

    // Mã hóa tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            const encrypted = caesarEncrypt(fileContent, shift);

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
    const shift = parseInt(document.getElementById('decryptionKey').value);

    // Kiểm tra khóa
    if (isNaN(shift) || shift < 0 || shift > 25) {
        alert("Vui lòng nhập khóa (số dịch) hợp lệ từ 0 đến 25.");
        return;
    }

    // Giải mã văn bản
    if (ciphertext) {
        const decrypted = caesarDecrypt(ciphertext, shift);
        document.getElementById('decryptedText').value = decrypted;
    }

    // Giải mã tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const encryptedContent = event.target.result;
            const decrypted = caesarDecrypt(encryptedContent, shift);
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
