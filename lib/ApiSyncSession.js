export default function ApiSyncSession(callback) {
    fetch('https://api.theskets.com/v1/private/session/get', {credentials: 'include'}).then((res) => res.json())
    .then((data) => {
        callback(data);
    })
}