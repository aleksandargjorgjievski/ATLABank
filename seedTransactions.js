const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');

// Ovdeka se importira tj service account key za da dade na ovj firebase - admin i faker user full privilegie sve
const serviceAccount = require('./serviceAccountKey.json');

// Ovdeka ga inicijalizira admin u firestore u app za da znae deka e admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Mogukje e da ne raboti inicijalizacija ako za nekoju prichinu ne ga navagja firebase i kje treba da ga link direktno ruchno nekako tuja
});

const db = admin.firestore();

// Ovdeka preko firebase skripta pristapue do user shto ni e grozdo, i posle pristapue u transactions
const userDocId = 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1';
const transactionsRef = db
    .collection('Users')
    .doc(userDocId)
    .collection('Transactions');

// Ovdeka gi definiramo katerogire koi su kako su
const categories = [
    'housing',
    'food',
    'transport',
    'education',
    'shopping',
    'entertainment',
    'health',
    'subscriptions',
    'financial',
    'donations',
];

// Ovdeka ima funkcija koja NADEZHNO kje napravi nekoju random datu
function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}

// Ovdeka namesti random data da e kude shto ide po logiku od niza 0 e januari, 1 e febrauri i 2 e mart itn itn itn
const startDate = new Date(2025, 1, 8); // 1 = Februari
const endDate = new Date(2025, 2, 8);   // 2 = Mart

// Ovdeka ima funkcija koja isto NADEZHNO kje napravi nekoju random tranzakciju od 1 do 1000
function createRandomTransaction() {
    const amount = Math.floor(Math.random() * 1000) + 1; // 1 do 1000
    const category = faker.helpers.arrayElement(categories);
    const randomDt = randomDate(startDate, endDate);

// Ovdeka bi trebalo da ni gi dade kako rezultat pare plateni kategorija i koju datu e napraveno
    return {
        amount,
        category,
        date: admin.firestore.Timestamp.fromDate(randomDt),
    };
}

// Napravi ga da napravi 10 tranzakcie ako raboti kje udrimo na povishke
const numberOfTransactions = 50;

async function seedTransactions() {
    for (let i = 0; i < numberOfTransactions; i++) {
        const transactionData = createRandomTransaction();

        try {
            // I na kraj ovdeka treba da gi pravi novi tranzakcie ustvari kude shto kje se unesue sve
            await transactionsRef.add(transactionData);
            console.log('Transaction added:', transactionData);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    }
    process.exit(0); // Ovdeka treba da ne izbaci od skriptu posle 1 vrtenje hopefully
}

seedTransactions();
