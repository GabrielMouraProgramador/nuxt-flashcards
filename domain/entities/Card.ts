export class Card{
    private readonly id: string | null = null
    private created_at: string =  Card.generateTimestamp()
    private readonly deck_id: string
    private readonly front: string
    private readonly behind: string
    private readonly difficulty: string= 'facil'
    private  next_game:string =  Card.generateTimestamp()
    private readonly last_time: string = '1d'

    
    constructor(data:{
        id?: string | null,
        created_at?: string,
        difficulty?: string,
        last_time?: string,
        next_game?: string
        
        deck_id: string,
        front: string,
        behind: string,
    }){
        if(!data.deck_id) throw new Error('O card não contem deck informado')
        if(!data.front) throw new Error('O não contem conteudo na frete')
        if(!data.behind) throw new Error('O não contem conteudo atras')

            
        this.deck_id = data.deck_id
        this.front = data.front
        this.behind = data.behind


        if(data.id) this.id = data.id
        if(data.difficulty) this.difficulty = data.difficulty
        if(data.last_time) this.last_time = data.last_time
        if(data.created_at) this.created_at = data.created_at
        if(data.next_game) this.next_game = data.next_game

    }
    public getValues(){
        return{
            id: this.id,
            created_at: this.created_at,
            deck_id: this.deck_id,
            front: this.front,
            behind: this.behind,
            difficulty: this.difficulty,
            next_game: this.next_game,
            last_time: this.last_time,
        }
    }
    public getCardId(){
        if (!this.id) throw new Error('O card não tem id declarado')
        
        return this.id
    }
    private static generateTimestamp(): string {
        const now = new Date()
        const iso = now.toISOString() // Ex: "2025-03-29T01:42:24.140Z"

        // Ajusta para o formato "2025-03-29 01:42:24.140000+00"
        const [date, time] = iso.split('T')
        const [seconds, msZ] = time.split('.')
        const ms = msZ.slice(0, 3) // pega os milissegundos
        return `${date} ${seconds}.${ms}000+00`
    }
}