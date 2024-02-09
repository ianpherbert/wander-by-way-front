export enum LocalStorageItem {
    LANGUAGE_PREFERENCE = "languagePreference"
}

export function getLocalStorageItem(item: LocalStorageItem) {
    return localStorage.getItem(item);
}

export function writeLocalStorageItem(item: LocalStorageItem, value: string) {
    try {
        localStorage.setItem(item, value);
        return true;
    } catch (_) {
        return false;
    }
}

export function deleteLocalStorageItem(item: LocalStorageItem) {
    try {
        localStorage.removeItem(item);
        return true;
    } catch (_) {
        return false;
    }
}