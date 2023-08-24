const BACKEND_TOKEN = 'XU6XLA4AMVOX5HY05V77KG1O1ILI8CCL4MSS1TJJ';
const BACKEND_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * set item to the backend
 * 
 * @param {string} key to push in the backend
 * @param {array} value what is included in the key
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: BACKEND_TOKEN };
    return fetch(BACKEND_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * fetch content from backend with key, if key is not correct error message
 * 
 * @param {string} key to get the content from backend
 * @returns fetched content from the key
 */
async function getItem(key) {
    const url = `${BACKEND_URL}?key=${key}&token=${BACKEND_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

