export const useFormat = {
    date(date: string): string {
        const parsedDate = new Date(date);
        
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, então adicionamos 1
        const year = parsedDate.getFullYear();
        
        return `${day}/${month}/${year}`;
    },
}