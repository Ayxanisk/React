const DB_NAME = 'AvatarDB';
const DB_VERSION = 2; // увеличили версию
const STORE_NAME = 'avatars';
const USER_STORE = 'users';

// Открытие базы данных
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains(USER_STORE)) {
                db.createObjectStore(USER_STORE, { keyPath: 'email' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
            console.error('❌ Failed to open IndexedDB:', request.error);
            reject(request.error);
        };
    });
};

// ✅ Сохранение логина и пароля
export const saveUserCredentials = async (email, password) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(USER_STORE, 'readwrite');
            const store = tx.objectStore(USER_STORE);

            const request = store.put({ email, password });

            request.onsuccess = () => resolve(true);
            request.onerror = () => {
                console.error('❌ Failed to save user credentials:', request.error);
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('❌ saveUserCredentials error:', error);
        throw error;
    }
};

// ✅ Получение логина и пароля по email
export const getUserCredentials = async (email) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(USER_STORE, 'readonly');
            const store = tx.objectStore(USER_STORE);

            const request = store.get(email);

            request.onsuccess = () => {
                resolve(request.result || null);
            };

            request.onerror = () => {
                console.error('❌ Failed to get user credentials:', request.error);
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('❌ getUserCredentials error:', error);
        throw error;
    }
};
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
}
// Удаление пользователя по email
export const deleteUserCredentials = async (id) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => {
                console.error('❌ Failed to delete user:', request.error);
                reject(request.error);
            };
        });
    } catch (error) {
        console.error('❌ deleteUserCredentials error:', error);
        throw error;
    }
};

// Обновление пароля пользователя
export const updateUserPassword = async (id, newPassword) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const user = getRequest.result;
                if (!user) {
                    reject(new Error('User not found'));
                    return;
                }

                user.password = newPassword;
                const updateRequest = store.put(user);

                updateRequest.onsuccess = () => resolve(true);
                updateRequest.onerror = () => reject(updateRequest.error);
            };

            getRequest.onerror = () => reject(getRequest.error);
        });
    } catch (error) {
        console.error('❌ updateUserPassword error:', error);
        throw error;
    }
};
