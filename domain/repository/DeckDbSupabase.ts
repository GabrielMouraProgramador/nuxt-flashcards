
import { Deck } from "../entities/Deck";
import type { IDeckRepository, ApiResponse, DeckDTO} from "../interfaces/IDeckRepository";

export class DeckDbSupabase implements IDeckRepository {
    private supabase: ReturnType<typeof useSupabaseClient>;

    constructor(){
        this.supabase = useSupabaseClient();
    }
  
    public async createDeck(deck: Deck): Promise<ApiResponse<{ id: string }>> {
        try {
            const { data, error } = await this.supabase
                .from('cards') 
                .insert([
                    {
                        name: deck.getName()
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
            console.error('Falha cadastrar o deck', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async renameDeck(deck: Deck): Promise<ApiResponse> {
        try {
            const { error } = await this.supabase
                .from('cards').update({name: deck.getName()} as never)

            
            if (error ) {
                throw error; 
            }

            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha renomear o deck', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    public async deleteDeck(deck_id: string): Promise<ApiResponse> {
            try {
                const { error:deckError } = await this.supabase.from('deck').delete().eq('id',deck_id)
                const { error:cardError } = await this.supabase.from('cards').delete().eq('deck_id',deck_id)
    
                if (deckError ||  cardError) {  throw { card: cardError , deck:deckError } }
    
                return { 
                    data: {},
                    status: 200
                };
    
            } catch (err:any) {
                console.error('Falha deletar o deck', err)
                return {
                    error: err?.error || 'Erro desconhecido',
                    status: err?.status || 500,
                }
            }
    }
    public async getDeckById(deck_id:string): Promise<ApiResponse<DeckDTO[]>> {
            try {
                const { data, error } = await this.supabase.from('deck').select().eq('id',deck_id)
         
                if (error) {  throw error }
           
                return { 
                    data: data.map((deck:any) => {
                        const deckMounted =  new Deck({
                            id: deck.id,
                            created_at: deck.created_at,
                            name: deck.name
                        })
                        return deckMounted.getValues() as DeckDTO
                    }),
                    status: 200
                };
    
            } catch (err:any) {
                console.error('Falha buscar o deck por id', err)
                return {
                    error: err?.error || 'Erro desconhecido',
                    status: err?.status || 500,
                }
            }
    }
    public async getAllDecks(): Promise<ApiResponse<DeckDTO[]>> {
            try {
                const { data, error } = await this.supabase.from('deck').select()
         
                if (error) {  throw error }
           
                return { 
                    data: data.map((deck:any) => {
                        const deckMounted =  new Deck({
                            id: deck.id,
                            created_at: deck.created_at,
                            name: deck.name
                        })
                        return deckMounted.getValues() as DeckDTO
                    }),
                    status: 200
                };
    
            } catch (err:any) {
                console.error('Falha buscar todos os cards', err)
                return {
                    error: err?.error || 'Erro desconhecido',
                    status: err?.status || 500,
                }
            }
        }

}
