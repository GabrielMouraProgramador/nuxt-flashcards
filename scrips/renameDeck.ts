import { Deck } from "~/domain/entities/Deck"

export const variables = ref<Variables>({
    showDialog: false,
    newName: "",
    loading: false,
})



export const methods  = {
    renameDeck: async (deck_id:string) => {
        const repositotyDeck = useDeck()

        repositotyDeck.renameDeck(new Deck({
            id: deck_id,
            name: variables.value.newName
        }))
    }
}

interface Variables {
    showDialog: boolean,
    newName: string,
    loading: boolean,
}
  