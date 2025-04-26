import { Card } from "~/domain/entities/Card"

export const variables = ref<Variables>({
    showDialog: true,
    front: {
        text: "",
        file: null,
    },
    behind:{
        text: "",
        file: null,
    },
    loading: false,
})



export const methods  = {
    addCard: async (deck_id:string) => {
        const repositotyCard = useCard()

        repositotyCard.createCard(new Card({
            deck_id: deck_id,
            front: variables.value.front.text,
            behind: variables.value.behind.text,
        }))
    }
}

interface Variables {
    showDialog: boolean,
    front: {
        text: string,
        file: File | null,
    },
    behind:  {
        text: string,
        file: File | null,
    },
    loading: boolean,
}
  