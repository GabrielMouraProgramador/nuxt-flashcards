export class Deck{
    private readonly id: string | null = null
    private readonly created_at?: Date
    private readonly name: string

    constructor(data:{
        id?: string | null,
        created_at?: Date,
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
}