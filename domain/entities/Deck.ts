export class Deck {
    private readonly id: string | null = null
    private readonly name: string
    private created_at: string =  Deck.generateTimestamp()

    constructor(data:{
        id?: string | null,
        created_at?: string,
        name: string,


    }){
        if(!data.name) throw new Error('O do deck não é valido')
            
        this.name = data.name

        if(data.id) this.id = data.id
        if(data.created_at) this.created_at = data.created_at

    }
    public getName(){
        return this.name
    }
    public getDeckId(){
        if (!this.id) throw new Error('O Deck não tem id declarado')
        
        return this.id
    }
    public getValues(){
        return{
            id: this.id,
            created_at: this.created_at,
            name: this.name
        }
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