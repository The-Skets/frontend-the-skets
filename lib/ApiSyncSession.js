export default function ApiSyncSession(callback) {
    fetch('http://192.168.1.209:5000/v1/private/session/get', {credentials: 'include'}).then((res) => res.json())
    .then((data) => {
        callback(data);
    })
}