import { serverSupabaseClient } from '#supabase/server'


export function useDeck() {
    const supabase = useSupabaseClient()
    // Add deck
    async function addDeck(name: string): Promise<void> {
      try {
        const { data, error } = await supabase.from('deck').insert({ name, cards: {} });

        if (error) {
          throw new Error(error.message);
        }
      } catch (err: any) {

        throw new Error(err.message);  // Optionally, rethrow or handle the error as needed
      }
    }

    async function getCardsDeck(deck_id: string): Promise<any> {
      try {
        const { data, error } = await supabase.from('cards').select().eq('deck_id',deck_id)
     
        if ( error) {
          throw new Error(error.message);
        }
        return data
    
      } catch (err: any) {
        throw new Error(err.message); 
      }
    }
    
    async function getAllDecks(): Promise<any> {
        try {
          const { data, error } = await supabase.from('deck').select()
       
          if ( error) {
            throw new Error(error.message);
          }
          return data
      
        } catch (err: any) {
          throw new Error(err.message); 
        }
      }
      async function getDeckById(deck_id:string): Promise<any> {
        try {
          const { data, error } = await supabase.from('deck').select().eq('id',deck_id)
       
          if ( error) {
            throw new Error(error.message);
          }
          return data[0]
      
        } catch (err: any) {
          throw new Error(err.message); 
        }
      }
      async function addCard(data: any): Promise<void> {
        try {
          const {deck_id,frete,tras } = data;

          const { error } = await supabase.from('cards').insert({ deck_id,frete,tras  });
  
          if (error) {
            throw new Error(error.message);
          }
        } catch (err: any) {
  
          throw new Error(err.message);  // Optionally, rethrow or handle the error as needed
        }
      }
  
    return {
      addDeck,
      getAllDecks,
      getCardsDeck,
      addCard,
      getDeckById,
    };
  }
  