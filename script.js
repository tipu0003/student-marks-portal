// Encryption Key (Use a strong key and keep it secret)
const SECRET_KEY = 'your-very-secure-key'; // Replace with a strong key

// Function to encrypt data using CryptoJS
function encrypt(data) {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// Function to decrypt data using CryptoJS
function decrypt(data) {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Example Marks Data (Encrypted)
// Both Enrollment and Application Numbers map to the same student data
const marksData = {
    // Enrollment Numbers
    'ENR001': {
        firstName: encrypt('Tarun'),
        lastName: encrypt('Singh'),
        marks: encrypt('QT: 85\nRPE: 90')
    },
    'ENR002': {
        firstName: encrypt('John'),
        lastName: encrypt('Doe'),
        marks: encrypt('QT: 78\nRPE: 88')
    },
    'ENR003': {
        firstName: encrypt('Alice'),
        lastName: encrypt('Williams'),
        marks: encrypt('QT: 92\nRPE: 87')
    },
    // Application Numbers
    'APP001': {
        firstName: encrypt('Tarun'),
        lastName: encrypt('Singh'),
        marks: encrypt('QT: 85\nRPE: 90')
    },
    'APP002': {
        firstName: encrypt('John'),
        lastName: encrypt('Doe'),
        marks: encrypt('QT: 78\nRPE: 88')
    },
    'APP003': {
        firstName: encrypt('Alice'),
        lastName: encrypt('Williams'),
        marks: encrypt('QT: 92\nRPE: 87')
    },
    // Add more student data as needed
};

document.getElementById('marksForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstname').value.trim().toLowerCase();
    const enrollment = document.getElementById('enrollment').value.trim();
    const application = document.getElementById('application').value.trim();

    // Validate that at least one identifier is provided
    if (!enrollment && !application) {
        alert('Please enter either Enrollment Number or Application Number.');
        return;
    }

    let identifier = '';
    if (enrollment) {
        identifier = enrollment;
    } else {
        identifier = application;
    }

    if (marksData.hasOwnProperty(identifier)) {
        const storedFirstName = decrypt(marksData[identifier].firstName).toLowerCase();
        const storedLastName = decrypt(marksData[identifier].lastName).toLowerCase();
        const enteredFirstName = firstName;

        if (storedFirstName === enteredFirstName) {
            const marks = decrypt(marksData[identifier].marks);
            document.getElementById('marksDisplay').innerText = marks;
            document.getElementById('result').classList.remove('hidden');
        } else {
            alert('Incorrect First Name.');
        }
    } else {
        alert('Identifier not found.');
    }
});
