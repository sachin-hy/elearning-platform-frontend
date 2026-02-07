import storage from "redux-persist/lib/storage";






export const authSlicePersistConfig = (userId) => ({
    key: `auth_${userId}`,
    storage,
    whitelist: ["token"]
});


export const profileSlicePersistConfig = (userId) => ({
        key: `profile_${userId}`,
        storage,
        whitelist: ["user"]
});


