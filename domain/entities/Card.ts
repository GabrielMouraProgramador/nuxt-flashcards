export class Card{
    private readonly id: string | null = null
    private readonly created_at?: Date
    private readonly deck_id: string
    private readonly front: string
    private readonly behind: string
    private readonly difficulty: string= 'facil'
    private readonly next_game: string
    private readonly last_time: string = '1d'

    
    constructor(data:{
        id?: string | null,
        created_at?: Date,
        difficulty?: string,
        last_time?: string,
        deck_id: string,
        front: string,
        behind: string,
        next_game: string

    }){
        if(!data.deck_id) throw new Error('O card não contem deck informado')
        if(!data.front) throw new Error('O não contem conteudo na frete')
        if(!data.behind) throw new Error('O não contem conteudo atras')
        if(!data.next_game) throw new Error('O não contem data do proximo jogo')

            
        this.deck_id = data.deck_id
        this.front = data.front
        this.behind = data.behind
        this.next_game = data.next_game

        if(data.id) this.id = data.id
        if(data.difficulty) this.difficulty = data.difficulty
        if(data.last_time) this.last_time = data.last_time
        if(data.created_at) this.created_at = data.created_at

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
}