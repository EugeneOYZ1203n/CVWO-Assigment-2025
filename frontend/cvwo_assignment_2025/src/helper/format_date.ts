// Format date to DD/MM
export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", etc.
    return `${day} ${month}`;
};