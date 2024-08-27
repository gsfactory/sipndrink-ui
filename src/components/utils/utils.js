
export const getDataUrlBlob = async (dataUrl) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return blob;
};

export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};