// Set data to local storege
export const setData = (storeName: string, data: object) => {
    return localStorage.setItem(storeName, JSON.stringify(data))
}

// Get data from local storage
export function getData(storeName: string): any {
    const data = localStorage.getItem(storeName)
    try {
      if (data) return JSON.parse(data)
    } catch (error) {
      console.error(error)
    }
    return ''
}

// Remove specific data from local storage
export const removeData = (storeName: string) => {
    localStorage.removeItem(storeName)
}

// Clear all local storage
export const clearData = () => {
    localStorage.clear();
}

export const getUser = () => getData('user-data') || ''