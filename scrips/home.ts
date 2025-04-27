import { useDeck } from "#imports"
import { Deck } from "~/domain/entities/Deck"

import type { DeckDTO } from "~/domain/interfaces/IDeckRepository"

export const variables = ref<Variables>({
    showNewDeck: false,
    newDeck:{
        name: "",
        loading: false,
    },
    list:{
        decks:[],
        loading: true,
    }
})



export const methods  = {
    newDeck: async () => {
        const repositotyDeck = useDeck()
        const repositoryStorage = useStorage() 
        variables.value.newDeck.loading = true
        const { data } = await repositotyDeck.createDeck(new Deck({
            name: variables.value.newDeck.name
        }))
            
        await methods.allDecks()
        
        variables.value.newDeck.loading = false
        variables.value.showNewDeck = false
        variables.value.newDeck.name = ''
    },
    allDecks: async () => {
        variables.value.list.loading = true
        const repositotyDeck = useDeck()
        const result = await repositotyDeck.getAllDecks()
        if(result.data) variables.value.list.decks = result.data
        variables.value.list.loading = false
    }
}

interface Variables {
    showNewDeck: boolean,
    newDeck:{
        name: string,
        loading: boolean,
    },
    list:{
        decks: DeckDTO[],
        loading: boolean,
    }
  }
  