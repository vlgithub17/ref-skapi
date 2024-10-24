const fs = require('fs');

// Read file synchronously
let data = fs.readFileSync('.env.production', 'utf8');
let date = new Date();
let newDate = date.toLocaleString();

data = data.replace(/(VITE_DATE\s*=\s*")[^"]*(")/, `$1${newDate}$2`);

fs.writeFileSync('.env.production', data);

const https = require('https');

const url = 'https://broadwayinc.com/pp/skapi.html';

https.get(url, (response) => {
    let html = '';

    // A chunk of data has been received
    response.on('data', (chunk) => {
        html += chunk;
    });

    // The whole response has been received
    response.on('end', () => {
        fs.writeFile('public/pp.html', html, (err) => {
            if (err) {
                console.error('파일을 쓰는 중 오류가 발생했습니다:', err);
                return;
            }
        });
    });
}).on('error', (error) => {
    throw 'Error making HTTP request:';
});
