// indexedDBUtils.js

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('AvatarDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('avatars')) {
                db.createObjectStore('avatars', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Failed to open IndexedDB:', request.error);
            reject(request.error);
        };
    });
};

export const saveAvatar = async (id, dataUrl) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('avatars', 'readwrite');
        const store = tx.objectStore('avatars');

        const request = store.put({ id, dataUrl });

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
    });
};

export const getAvatar = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('avatars', 'readonly');
        const store = tx.objectStore('avatars');

        const request = store.get(id);

        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result.dataUrl);
            } else {
                resolve(null); // Not found
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
};
