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
  
    return {
      addDeck,
      getAllDecks,
    };
  }
  