// Tạo khóa ngẫu nhiên
document.getElementById('generateKeyBtn').addEventListener('click', function() {
    var generatedKey = Math.random().toString(36).substr(2, 10); // Khóa ngẫu nhiên 10 ký tự
    document.getElementById('encryptionKey').value = generatedKey;
});

// Mã hóa văn bản
document.getElementById('encryptBtn').addEventListener('click', function() {
    var plaintext = document.getElementById('plaintext').value;
    var encryptionKey = document.getElementById('encryptionKey').value;

    if (!plaintext || !encryptionKey) {
        alert('Vui lòng nhập bản rõ và khóa mã hóa!');
        return;
    }

    var combinedText = plaintext + encryptionKey;
    var ciphertext = CryptoJS.MD5(combinedText).toString();

    document.getElementById('ciphertext').value = ciphertext;
});

// Mã hóa file khi chọn file
// Tạo khóa ngẫu nhiên
document.getElementById('generateKeyBtn').addEventListener('click', function() {
    var generatedKey = Math.random().toString(36).substr(2, 10); // Khóa ngẫu nhiên 10 ký tự
    document.getElementById('encryptionKey').value = generatedKey;
});

// Mã hóa file
document.getElementById('encryptFileBtn').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput').files[0];
    var encryptionKey = document.getElementById('encryptionKey').value;

    if (!fileInput || !encryptionKey) {
        alert('Vui lòng chọn file và nhập khóa mã hóa!');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var fileContent = e.target.result;
        var encryptedFileContent = CryptoJS.MD5(fileContent + encryptionKey).toString();

        // Tạo file mới đã mã hóa và tự động tải về
        var blob = new Blob([encryptedFileContent], { type: "text/plain;charset=utf-8" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileInput.name + ".encrypted"; // Đặt tên file mới
        link.click();
    };
    reader.readAsText(fileInput); // Đọc nội dung file
});

// Giải mã file
document.getElementById('decryptFileBtn').addEventListener('click', function() {
    var fileInput = document.getElementById('fileInput').files[0];
    var decryptionKey = document.getElementById('decryptionKey').value;

    if (!fileInput || !decryptionKey) {
        alert('Vui lòng chọn file đã mã hóa và nhập khóa giải mã!');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var encryptedFileContent = e.target.result;
        var decryptedFileContent = CryptoJS.MD5(encryptedFileContent + decryptionKey).toString();

        // Kiểm tra xem khóa giải mã có đúng không
        if (decryptedFileContent === encryptedFileContent) {
            alert('Giải mã thành công!');

            // Tạo file đã giải mã và tự động tải về
            var blob = new Blob([decryptedFileContent], { type: "text/plain;charset=utf-8" });
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileInput.name.replace(".encrypted", ".decrypted"); // Đổi tên file
            link.click();
        } else {
            alert('Khóa giải mã không đúng!');
        }
    };
    reader.readAsText(fileInput); // Đọc nội dung file
});


// Giải mã
document.getElementById('decryptBtn').addEventListener('click', function() {
    var ciphertext = document.getElementById('ciphertext').value;
    var decryptionKey = document.getElementById('decryptionKey').value;
    var plaintext = document.getElementById('plaintext').value;

    if (!ciphertext || !decryptionKey) {
        alert('Vui lòng nhập bản mã và khóa giải mã!');
        return;
    }

    var combinedText = plaintext + decryptionKey;
    var hashedText = CryptoJS.MD5(combinedText).toString();

    if (hashedText === ciphertext) {
        document.getElementById('decryptedText').value = plaintext;
    } else {
        alert('Khóa giải mã không đúng!');
        document.getElementById('decryptedText').value = '';
    }
});

// Lưu bản rõ
document.getElementById('saveBtn').addEventListener('click', function() {
    var plaintext = document.getElementById('plaintext').value;
    var saveClearText = document.getElementById('saveClearText').checked;

    if (saveClearText && plaintext) {
        var blob = new Blob([plaintext], { type: "text/plain;charset=utf-8" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "clear_text.txt";
        link.click();
    } else {
        alert('Vui lòng nhập bản rõ và chọn lưu!');
    }
});

// Xóa tất cả nội dung
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('encryptionKey').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('fileCiphertext').value = '';
    document.getElementById('decryptionKey').value = '';
    document.getElementById('decryptedText').value = '';
    document.getElementById('fileInput').value = '';
});
