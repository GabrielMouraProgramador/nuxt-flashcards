
import { Card } from "../entities/Card";
import type { ApiResponse, CardDTO, ICardRepository } from "../interfaces/ICardRepository";

export class CardsDbSupabase implements ICardRepository {
    private supabase: ReturnType<typeof useSupabaseClient>;

    constructor(){
        this.supabase = useSupabaseClient();
    }
  
    public async createCard(card: Card): Promise<ApiResponse<{ id: string }>> {
        try {
            const { deck_id,front,behind,difficulty,next_game,last_time } = card.getValues()
            const { data, error } = await this.supabase
                .from('cards') 
                .insert([
                    {
                        deck_id: deck_id,
                        front: front,
                        behind: behind,
                        difficulty: difficulty,
                        next_game: next_game,
                        last_time: last_time,
                    }
                ] as any).select()

            
            if (error || !data ||  data.length == 0) {
                throw error; 
            }

            const id = data[0]

            return { 
                data: { id },
                status: 200
            };

        } catch (err:any) {
            console.error('Falha cadastrar o card', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async updateCard(card: Card): Promise<ApiResponse> {
        try {
            const { deck_id,front,behind,difficulty,next_game,last_time } = card.getValues()
            const {  error } = await this.supabase
                .from('cards') 
                .update({
                    deck_id: deck_id,
                    front: front,
                    behind: behind,
                    difficulty: difficulty,
                    next_game: next_game,
                    last_time: last_time,
                } as never).eq('id', card.getCardId());

    

            if (error) {
                throw error; 
            }

        
            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha modificar o card', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async deleteCard(card_id: string): Promise<ApiResponse> {
        try {
            const {  error } = await this.supabase.from('cards').delete().eq('id',card_id)

            if (error) {  throw error }

            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha deletar o card', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async updateDifficultyCard(card: Card): Promise<ApiResponse> {
        try {
            const { deck_id,front,behind,difficulty,next_game,last_time } = card.getValues()
            const {  error } = await this.supabase
                .from('cards') 
                .update({
                    difficulty: difficulty,
                    next_game: next_game,
                    last_time: last_time,
                } as never).eq('id', card.getCardId());

            if (error) {
                throw error; 
            }

        
            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha modificar a dificuldade do card', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async getCardsToday(deck_id:string): Promise<ApiResponse<CardDTO[]>> {
        try {
            const { data, error } = await this.supabase.from('cards').select().lt('next_game', 'now()').eq('deck_id',deck_id)
     
            if (error) {  throw error }
       
            return { 
                data: data.map((card:any) => {
                    return new Card({
                        id: card.id,
                        created_at: card.created_at,
                        difficulty: card.difficulty,
                        last_time: card.ultimo_tempo,
                        deck_id: card.deck_id,
                        front: card.frete,
                        behind: card.tras,
                        next_game: card.next_game
                    }).getValues() as CardDTO
                }),
                status: 200
            };

        } catch (err:any) {
            console.error('Falha buscar os cards de hoje', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async getCardsAlreadyStudied(deck_id:string): Promise<ApiResponse<CardDTO[]>> {
        try {
            const { data, error } =  await this.supabase.from('cards').select().gt('next_game', 'now()').eq('deck_id',deck_id)
     
            if (error) {  throw error }
       
            return { 
                data: data.map((card:any) => {
                    return new Card({
                        id: card.id,
                        created_at: card.created_at,
                        difficulty: card.difficulty,
                        last_time: card.ultimo_tempo,
                        deck_id: card.deck_id,
                        front: card.frete,
                        behind: card.tras,
                        next_game: card.next_game
                    }).getValues() as CardDTO
                }),
                status: 200
            };

        } catch (err:any) {
            console.error('Falha buscar os cards estudados', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async getCardsByDeckId(deck_id:string): Promise<ApiResponse<CardDTO[]>> {
        try {
            const { data, error } = await this.supabase.from('cards').select().eq('deck_id',deck_id)
     
            if (error) {  throw error }
       
            return { 
                data: data.map((card:any) => {
                    return new Card({
                        id: card.id,
                        created_at: card.created_at,
                        difficulty: card.difficulty,
                        last_time: card.ultimo_tempo,
                        deck_id: card.deck_id,
                        front: card.frete,
                        behind: card.tras,
                        next_game: card.next_game
                    }).getValues() as CardDTO
                }),
                status: 200
            };

        } catch (err:any) {
            console.error('Falha buscar os cards por deck id', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
}
