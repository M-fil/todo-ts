export enum StorageKeys {
  State = 'state',
}

export const saveDataToStorage = <T, >(key: string, value: T): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromStorage = <T, >(key: string): T | null => {
  const dataString = window.localStorage.getItem(key);
  if (dataString) {
    return JSON.parse(dataString);
  }
  return null;
};

export const removeDataFromStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};
