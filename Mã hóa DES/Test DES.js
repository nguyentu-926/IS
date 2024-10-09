document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const key = CryptoJS.lib.WordArray.random(64 / 8).toString();
    document.getElementById('encryptionKey').value = key;
});

document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('encryptionKey').value;

    if (plaintext && key) {
        const encrypted = CryptoJS.DES.encrypt(plaintext, key);
        document.getElementById('ciphertext').value = encrypted.toString();
    } else {
        alert("Vui lòng nhập bản rõ và khóa.");
    }
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    const key = document.getElementById('decryptionKey').value;

    if (ciphertext && key) {
        const decrypted = CryptoJS.DES.decrypt(ciphertext, key);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        document.getElementById('decryptedText').value = plaintext;
    } else {
        alert("Vui lòng nhập bản mã và khóa.");
    }
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const clearText = document.getElementById('decryptedText').value;
    const blob = new Blob([clearText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decryptedText.txt";
    link.click();
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptionKey').value = '';
    document.getElementById('decryptedText').value = '';
});
