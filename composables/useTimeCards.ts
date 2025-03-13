export const useTimeCards = {
    difficultyLevels :{
        facil: '3D',
        bom: '20m',
        dificil: '8m',
        agora: 'agora'
    },
    getTime(data) {
        const { old_difficulty, new_difficulty, last_date } = data;
        let baseTime = this.difficultyLevels[new_difficulty];

    
        if (old_difficulty === new_difficulty) {
            const match = baseTime.match(/(\d+)([dhms])/i);
            if (match) {
                const value = parseInt(match[1], 10) * 2;
                baseTime = `${value}${match[2]}`;
            }
        }
        console.log('click',this.addTimeToDate(last_date, baseTime))
        return this.addTimeToDate(last_date, baseTime);
    },
    addTimeToDate(dateString:string, duration:string) {
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        const milliseconds = parseFloat(`0.${timePart.split('.')[1] || '0'}`) * 1000;
    
        let date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
        
        const match = duration.match(/(\d+)([dhms])/i);
        if (!match) {
            throw new Error("Formato de duração inválido. Use '2D', '1h', '30m', '15s', etc.");
        }
        
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        
        switch (unit) {
            case 'd':
                date.setUTCDate(date.getUTCDate() + value);
                break;
            case 'h':
                date.setUTCHours(date.getUTCHours() + value);
                break;
            case 'm':
                date.setUTCMinutes(date.getUTCMinutes() + value);
                break;
            case 's':
                date.setUTCSeconds(date.getUTCSeconds() + value);
                break;
            default:
                throw new Error("Unidade de tempo inválida. Use 'd' para dias, 'h' para horas, 'm' para minutos ou 's' para segundos.");
        }
        
        const formattedDate = date.toISOString().replace('T', ' ').replace('Z', '').slice(0, 23);

        return formattedDate;
    },
    getTimeDifference(dateString:string) {
        const currentDate = new Date();
        const targetDate = new Date(dateString);
        const diffMs = targetDate - currentDate;
        
        if (diffMs <= 0) return 'agora';
        
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        if (diffDays > 0) return `${diffDays}D`;
        if (diffHours > 0) return `${diffHours}h`;
        if (diffMinutes > 0) return `${diffMinutes}m`;

        console.log(diffSeconds)
        return `${diffSeconds}s`;
    }
    
}