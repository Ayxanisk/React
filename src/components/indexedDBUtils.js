// indexedDBUtils.js
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('AvatarDB', 1);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('avatars')) {
                db.createObjectStore('avatars', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveAvatar = async (id, dataUrl) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('avatars', 'readwrite');
        const store = tx.objectStore('avatars');
        store.put({ id, dataUrl });

        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
};

export const getAvatar = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('avatars', 'readonly');
        const store = tx.objectStore('avatars');
        const request = store.get(id);

        request.onsuccess = () => {
            if (request.result) resolve(request.result.dataUrl);
            else resolve(null);
        };
        request.onerror = () => reject(request.error);
    });
};
