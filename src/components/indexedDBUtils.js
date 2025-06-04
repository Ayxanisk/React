// indexedDBUtils.js

const DB_NAME = 'AvatarDB';
const DB_VERSION = 1;
const STORE_NAME = 'avatars';

// Открытие базы данных
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
            console.error('❌ Failed to open IndexedDB:', request.error);
            reject(request.error);
        };
    });
};

// Сохранение аватара по id (email)
export const saveAvatar = async (id, dataUrl) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);

            const request = store.put({ id, dataUrl });

            request.onsuccess = () => resolve(true);
            request.onerror = () => {
                console.error('❌ Failed to save avatar:', request.error);
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('❌ saveAvatar error:', error);
        throw error;
    }
};

// Получение аватара по id
export const getAvatar = async (id) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);

            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result?.dataUrl || null);
            };

            request.onerror = () => {
                console.error('❌ Failed to get avatar:', request.error);
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('❌ getAvatar error:', error);
        throw error;
    }
};
