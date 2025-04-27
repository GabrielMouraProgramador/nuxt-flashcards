import { Card } from "~/domain/entities/Card"
import type { CardDTO } from "~/domain/interfaces/ICardRepository"

export const variables = ref<Variables>({
    showDialog: false,
    typeAction:'CREATE',
    card_id:'',
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
        const repositoryStorage = useStorage()

        const filefront = variables.value.front.file || null
        const fileBehind = variables.value.behind.file || null

        const { data } = await repositotyCard.createCard(new Card({
            deck_id: deck_id,
            front: variables.value.front.text,
            behind: variables.value.behind.text,
            fileNameFront: filefront?.name || '',
            fileNameBehind: fileBehind?.name || '',
        }))
        if(data && data.id){
            const card_id = data.id
            await repositoryStorage.createBucket(card_id)

            if(filefront) await repositoryStorage.uploadFile(card_id, filefront)
            if(fileBehind) await repositoryStorage.uploadFile(card_id, fileBehind)
        }

        methods.refreshPage()
    },
    updateCard: async (deck_id:string) => {
        const repositotyCard = useCard()
        const repositoryStorage = useStorage()

        const filefront = variables.value.front.file || null
        const fileBehind = variables.value.behind.file || null

        await repositotyCard.updateCard(new Card({
            id: variables.value.card_id,
            deck_id: deck_id,
            front: variables.value.front.text,
            behind: variables.value.behind.text,
        }))

      
        const card_id = variables.value.card_id
        await repositoryStorage.createBucket(card_id)

        if(filefront) await repositoryStorage.uploadFile(card_id, filefront)
        if(fileBehind) await repositoryStorage.uploadFile(card_id, fileBehind)
    

        methods.refreshPage()
    },
    activeMethod: async (deck_id:string) => {
        if(variables.value.typeAction === 'CREATE') await  methods.addCard(deck_id)
        if(variables.value.typeAction === 'EDIT') await methods.updateCard(deck_id)
    },
    showForm:(action: 'CREATE'| 'EDIT', card?:CardDTO) => {
        console.log(card)
        variables.value.typeAction = action === "EDIT" ? "EDIT" : "CREATE";
        variables.value.showDialog = true
        if(variables.value.typeAction === 'EDIT' && card  && card.id){
            variables.value.card_id = card.id 
            variables.value.front = {
                text: card.front,
                file: null,
            }
            variables.value.behind = {
                text:card.behind,
                file: null,
            }
        }
    },
    cleanForm: () => {
        variables.value.typeAction = 'CREATE',
        variables.value.card_id = ''
        variables.value.front = {
            text: "",
            file: null,
        }
        variables.value.behind = {
            text: "",
            file: null,
        }
    },
    refreshPage: () => {
        const router = useRouter()
        router.go(0);
    },
}

watch(
    () => variables.value.showDialog,
    (newValue) => {
        if(newValue === false){
            setTimeout(() => {
                methods.cleanForm()
            },500)
        }
    }
)

interface Variables {
    showDialog: boolean,
    typeAction: 'CREATE'| 'EDIT',
    card_id:string,
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
  