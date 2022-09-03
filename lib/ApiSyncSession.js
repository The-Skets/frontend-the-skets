export default function ApiSyncSession(callback) {
    fetch('http://127.0.0.1:5000/v1/private/session/get', {credentials: 'include'}).then((res) => res.json())
    .then((data) => {
        callback(data);
    })
}