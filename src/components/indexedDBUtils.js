// indexedDBUtils.js
const DB_NAME = 'AvatarDB';
const DB_VERSION = 2; // увеличили версию
const STORE_NAME = 'avatars';
const USER_STORE = 'users';
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
export const saveUserCredentials = async (email, password, name) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(USER_STORE, 'readwrite');
            const store = tx.objectStore(USER_STORE);

            const request = store.put({ email, password, name });

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

// Удаление пользователя по email
export const deleteUserCredentials = async (email) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
            const request = store.delete(email);
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

// Замените параметр id на email
export const updateUserPassword = async (email, newPassword) => { // ✅
    try {
        console.log(`Updating password for user: ${email}`);
        const db = await openDB();

        return new Promise((resolve, reject) => {
            const tx = db.transaction(USER_STORE, 'readwrite');
            const store = tx.objectStore(USER_STORE);

            // Ищем по email вместо id
            const getRequest = store.get(email); // ✅

            getRequest.onsuccess = () => {
                const user = getRequest.result;
                if (!user) {
                    reject(new Error('User not found'));
                    return;
                }

                user.password = newPassword;
                const updateRequest = store.put(user);

                updateRequest.onsuccess = () => resolve(true);
                updateRequest.onerror = (e) => reject(e.target.error);
            };

            getRequest.onerror = (e) => reject(e.target.error);
        });
    } catch (error) {
        throw error;
    }
};
// indexedDBUtils.js
export const updateUserName = async (email, newName) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(USER_STORE, 'readwrite');
            const store = tx.objectStore(USER_STORE);

            const getRequest = store.get(email);

            getRequest.onsuccess = () => {
                const user = getRequest.result;
                if (!user) {
                    reject(new Error('User not found'));
                    return;
                }

                user.name = newName; // Обновляем имя
                const updateRequest = store.put(user);

                updateRequest.onsuccess = () => resolve(true);
                updateRequest.onerror = (e) => reject(e.target.error);
            };

            getRequest.onerror = (e) => reject(e.target.error);
        });
    } catch (error) {
        throw error;
    }
};