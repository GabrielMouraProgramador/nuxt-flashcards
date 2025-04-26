import type { CardDTO } from "~/domain/interfaces/ICardRepository"

export const variables = ref<Variables>({
    answers: false,
    allCards: [],
    alreadyStudied: [],
    todayCards: [],
    info: {},
    loading: true,
    menuDeck: [
      { text: "Novo Card", icon: "mdi-plus", event: 'newCard'},
      { text: "Renomear", icon: "mdi-rename", event: 'renameDeck' },
      { text: "Apagar", icon: "mdi-delete", event: 'deleteDeck' },
      { text: "Estudar Todos", icon: "mdi-account-school", event: 'goAllCards' },
    ],
})
export const notStudied = computed(() => 
    variables.value.alreadyStudied.length - variables.value.todayCards.length > 0
    ? 0
    : variables.value.todayCards.length - variables.value.alreadyStudied.length 

)
export const methods  = {
    refreshPage: () => {
        const router = useRouter()
        router.go(0);
    },
    deleteDeck: async (deck_id:string) => {
        const router = useRouter()
        const repositotyDeck = useDeck()

        await repositotyDeck.deleteDeck(deck_id)
        router.push("/");
    },
    getCardsDeck: async (deck_id:string):Promise<CardDTO[]> => {
        const repositotyCard = useCard()
        const { data:allCards } = await repositotyCard.getCardsByDeckId(deck_id)

        return  (allCards) ? allCards: []
    },
    getInfoDeck: async (deck_id:string)=> {
        const repositotyDeck = useDeck()
   
        
        const { data:InfoDeck } =  await repositotyDeck.getDeckById(deck_id)
        return  (InfoDeck && InfoDeck.length > 0) ? InfoDeck[0]: {}
    },
    getCardsToday: async (deck_id:string):Promise<CardDTO[]> => {
        const repositotyCard = useCard()

        const { data:todayCards } = await repositotyCard.getCardsToday(deck_id)

        return  (todayCards) ? todayCards: []
    },
    getCardsStudied: async (deck_id:string):Promise<CardDTO[]> => {
        const repositotyCard = useCard()
        const { data:alreadyStudied } = await repositotyCard.getCardsAlreadyStudied(deck_id)
   
        return  (alreadyStudied) ? alreadyStudied: []
    },

    refresh: async (deck_id:string) => {
        variables.value.loading = true;
        const repositotyDeck = useDeck()
        const repositotyCard = useCard()
        
        variables.value.info =  await methods.getInfoDeck(deck_id)
  
        variables.value.allCards  = await methods.getCardsDeck(deck_id)

        variables.value.todayCards  =  await methods.getCardsToday(deck_id)
        
        variables.value.alreadyStudied  =  await methods.getCardsStudied(deck_id)

        variables.value.loading = false;
    },
}

interface MenuItem {
    text: string;
    icon: string;
    event: string;
}

interface Variables {
    answers: boolean,
    allCards: CardDTO[],
    alreadyStudied: CardDTO[],
    todayCards:CardDTO[],
    info: {},
    loading: boolean,
    menuDeck:MenuItem[]
}
  