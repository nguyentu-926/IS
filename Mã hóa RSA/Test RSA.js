document.addEventListener("DOMContentLoaded", function() {
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    let rsa = new JSEncrypt();
    let publicKey = '';
    let privateKey = '';

    // Tạo khóa RSA
    generateKeyBtn.addEventListener('click', function() {
        rsa = new JSEncrypt({ default_key_size: 1024 });
        publicKey = rsa.getPublicKey();
        privateKey = rsa.getPrivateKey();

        document.getElementById('encryptionKey').value = publicKey;
        document.getElementById('decryptionKey').value = privateKey;
        alert('Khóa RSA đã được tạo thành công!');
    });

    // Mã hóa văn bản hoặc file
    encryptBtn.addEventListener('click', function() {
        const plaintext = document.getElementById('plaintext').value;
        const fileInput = document.getElementById('fileInput').files[0];
        const customKey = document.getElementById('encryptionKey').value;

        if (customKey) {
            rsa.setPublicKey(customKey);
        } else if (publicKey) {
            rsa.setPublicKey(publicKey);
        } else {
            alert('Hãy tạo khóa hoặc nhập khóa mã hóa!');
            return;
        }

        if (fileInput) {
            handleFileEncrypt(fileInput, rsa);
        } else if (plaintext) {
            const ciphertext = rsa.encrypt(plaintext);
            document.getElementById('ciphertext').value = ciphertext || 'Mã hóa thất bại!';
        } else {
            alert('Hãy nhập văn bản hoặc chọn file để mã hóa!');
        }
    });

    // Giải mã file hoặc văn bản
    decryptBtn.addEventListener('click', function() {
        const ciphertext = document.getElementById('ciphertext').value;
        const customKey = document.getElementById('decryptionKey').value;
        const fileInput = document.getElementById('fileInput').files[0];

        if (!customKey) {
            alert('Hãy nhập khóa giải mã!');
            return;
        }

        rsa.setPrivateKey(customKey);

        if (fileInput) {
            handleFileDecrypt(fileInput, rsa);
        } else if (ciphertext) {
            const decryptedText = rsa.decrypt(ciphertext);
            document.getElementById('decryptedText').value = decryptedText || 'Giải mã thất bại!';
        } else {
            alert('Không có bản mã để giải mã!');
        }
    });

    // Mã hóa file
    function handleFileEncrypt(file, rsa) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            const encryptedContent = rsa.encrypt(fileContent);
            const blob = new Blob([encryptedContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'encrypted_file.txt';
            link.click();
        };
        reader.readAsText(file);
    }

    // Giải mã file
    function handleFileDecrypt(file, rsa) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            const decryptedContent = rsa.decrypt(fileContent);
            const blob = new Blob([decryptedContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'decrypted_file.txt';
            link.click();
        };
        reader.readAsText(file);
    }

    // Lưu văn bản đã giải mã
    saveBtn.addEventListener('click', function() {
        const decryptedText = document.getElementById('decryptedText').value;
        if (!decryptedText) {
            alert('Không có văn bản để lưu!');
            return;
        }

        const blob = new Blob([decryptedText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'decrypted_text.txt';
        link.click();
    });

    // Xóa nội dung
    clearBtn.addEventListener('click', function() {
        document.getElementById('plaintext').value = '';
        document.getElementById('encryptionKey').value = '';
        document.getElementById('ciphertext').value = '';
        document.getElementById('decryptionKey').value = '';
        document.getElementById('decryptedText').value = '';
        publicKey = '';
        privateKey = '';
    });
});
