import App from 'components/App';

let app = new App().template();
console.log(app);

const tempDiv = document.createElement('div');
tempDiv.innerHTML = app;

document.getElementById('app').appendChild(tempDiv);