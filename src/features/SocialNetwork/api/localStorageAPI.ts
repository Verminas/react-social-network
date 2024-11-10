export const localStorageAPI = {
  getElement(key: string): Promise<unknown> {
    return new Promise(resolve => {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
    });
  },
  setElement<T>(key: string, value: T): Promise<unknown> {
    const serializedData = JSON.stringify(value)
    return new Promise(resolve => {
      localStorage.setItem(key, serializedData);
      resolve(value);
    });
  },
  removeElement(key: string) {
    return new Promise(resolve => {
      localStorage.removeItem(key);
      resolve('');
    });
  },

};