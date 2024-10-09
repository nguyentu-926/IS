function encrypt() {
    let inputText = document.getElementById('inputText').value;
    let key = parseInt(document.getElementById('key').value);
    let a = 5; 
    let b = key; 
    let encryptedText = '';

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText.charAt(i);

        if (char.match(/[a-zA-Z]/)) {
            let code = inputText.charCodeAt(i);
            if (code >= 65 && code <= 90) { 
                encryptedText += String.fromCharCode(((a * (code - 65) + b) % 26) + 65);
            } else if (code >= 97 && code <= 122) { 
                encryptedText += String.fromCharCode(((a * (code - 97) + b) % 26) + 97);
            }
        } else {
            encryptedText += char; 
        }
    }
    document.getElementById('encryptedText').value = encryptedText;
}

function decrypt() {
    let encryptedText = document.getElementById('encryptedText').value;
    let key = parseInt(document.getElementById('key').value);
    let a = 5; 
    let b = key; 
    let a_inv = 21; 
    let decryptedText = '';

    for (let i = 0; i < encryptedText.length; i++) {
        let char = encryptedText.charAt(i);

        if (char.match(/[a-zA-Z]/)) {
            let code = encryptedText.charCodeAt(i);
            if (code >= 65 && code <= 90) { 
                decryptedText += String.fromCharCode((a_inv * (code - 65 - b + 26) % 26) + 65);
            } else if (code >= 97 && code <= 122) { 
                decryptedText += String.fromCharCode((a_inv * (code - 97 - b + 26) % 26) + 97);
            }
        } else {
            decryptedText += char; 
        }
    }

    document.getElementById('decryptedText').value = decryptedText;
}