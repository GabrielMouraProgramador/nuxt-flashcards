import { serverSupabaseClient } from '#supabase/server'


export function useDeck() {
    const supabase = useSupabaseClient()
    const storage = useStorage()
    // Add deck
    async function addDeck(name: string): Promise<void> {
      try {
        const { data, error } = await supabase.from('deck').insert({ name, cards: {} }).select();
   
        if (error || !data || data.length == 0 ) {
          throw new Error(error.message);
        }

        const {id: deckId}=  data[0]
        await storage.createBucket(deckId)
      } catch (err: any) {

        throw new Error(err.message);  // Optionally, rethrow or handle the error as needed
      }
    }
    function shuffleArray(array:any) {
      for (let i = array.length - 1; i > 0; i--) {
        // Gera um índice aleatório entre 0 e i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Troca os elementos de índice i e j
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    async function getCardsDeck(deck_id: string): Promise<any> {
      try {
        const { data, error } = await supabase.from('cards').select().eq('deck_id',deck_id)
        
        if ( error) {
          throw new Error(error.message);
        }
        return shuffleArray(data);
    
      } catch (err: any) {
        throw new Error(err.message); 
      }
    }
    async function renameDeck(deck_id: string, newName:string): Promise<any> {
      try {
        const { data, error } = await supabase.from('deck').update({ name: newName }).eq('id',deck_id)
     
        if ( error) {
          throw new Error(error.message);
        }
        return data
    
      } catch (err: any) {
        throw new Error(err.message); 
      }
    }
    async function deleteDeck(deck_id: string): Promise<any> {
      try {
        await supabase.from('deck').delete().eq('id',deck_id)
        await supabase.from('cards').delete().eq('deck_id',deck_id)

    
      } catch (err: any) {
        throw new Error(err.message); 
      }
    }
    async function deleteCard(card_id: string): Promise<any> {
      try {
        await supabase.from('cards').delete().eq('id',card_id)

    
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
        const {deck_id,frete,tras,imageFrente,imageTras } = data;
        const fileNameFrente = ( imageFrente?.name)? imageFrente.name  :"";
        const fileNameTras = ( imageTras?.name)? imageTras.name  :"";

        const { error } = await supabase.from('cards').insert({ deck_id,frete,tras, imageFrente: fileNameFrente,imageTras: fileNameTras });

        if (error) {
          throw new Error(error.message);
        }
        if(imageFrente) storage.uploadFile(deck_id,imageFrente)
        if(imageTras) storage.uploadFile(deck_id,imageTras)

      } catch (err: any) {

        throw new Error(err.message);  // Optionally, rethrow or handle the error as needed
      }
    }
    async function updateCard(data: any): Promise<void> {
      try {
        const {id_card,frete,tras,imageFrente,imageTras,deck_id } = data;

        const fileNameFrente = ( imageFrente?.name)? imageFrente.name  :"";
        const fileNameTras = ( imageTras?.name)? imageTras.name  :"";
        const { error } = await supabase.from('cards').update({ frete,tras,   }).eq('id', id_card);

        if(fileNameFrente){
          await supabase.from('cards').update({ imageFrente: fileNameFrente  }).eq('id', id_card);
        }
        if(fileNameTras){
          await supabase.from('cards').update({ imageTras: fileNameTras  }).eq('id', id_card);
        }

        if (error) {
          throw new Error(error.message);
        }
        if(imageFrente) storage.uploadFile(deck_id,imageFrente)
        if(imageTras) storage.uploadFile(deck_id,imageTras)

      } catch (err: any) {

        throw new Error(err.message);  // Optionally, rethrow or handle the error as needed
      }
    }
    async function setDifficultyCard(data: any): Promise<any> {
      try {
        const {difficulty,next_game,time,card_id } = data;

        const { error } = await supabase.from('cards').update({ difficulty,next_game,ultimo_tempo:time }).eq('id', card_id);

    
      } catch (err: any) {
        throw new Error(err.message); 
      }
    }
    async function getCardsToday(deck_id:string): Promise<any> {
      try {
        const { data, error } = await supabase.from('cards').select().lt('next_game', 'now()').eq('deck_id',deck_id)
      
        if (error) {
          throw new Error(error.message);
        }
        return shuffleArray(data);
    
      } catch (err: any) {
        throw new Error(err.message); 
      }
    }
    async function getCardsAlreadyStudied(deck_id:string): Promise<any> {
      try {
        const { data, error } = await supabase.from('cards').select().gt('next_game', 'now()').eq('deck_id',deck_id)
      
        if (error) {
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
      getCardsDeck,
      addCard,
      getDeckById,
      renameDeck,
      deleteDeck,
      deleteCard,
      updateCard,
      setDifficultyCard,
      getCardsToday,
      getCardsAlreadyStudied
    };
  }
  