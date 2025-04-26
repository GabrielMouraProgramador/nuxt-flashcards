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
    clickedMenuDeck: (func:string) => {
        // if (func == "Novo Card") {
        //     this.$refs.addcard.dialog = true;
        // }

        // if (func == "Renomear") {
        //     this.$refs.renameDeck.sheet = true;
        //     this.refresh();
        // }
        // if (func == "Estudar Todos") {
        //     this.$router.push(`/estudar/all-cards/${this.$route.params.deck_id}`);
        // }

        // if (func == "Apagar") {
        //     this.$refs.confirmDelete.confirmDelete(
        //     this.$route.params.deck_id,
        //     "DECK " + this.info?.name
        //     );
        // }
    },
    refresh: async (deck_id:string) => {
        variables.value.loading = true;
        const repositotyDeck = useDeck()
        const repositotyCard = useCard()
        
        variables.value.info = await repositotyDeck.getDeckById(deck_id)

        const { data:allCards } = await repositotyCard.getCardsByDeckId(deck_id)
        if(allCards) variables.value.allCards  = allCards
        
            
        const { data:todayCards } = await repositotyCard.getCardsToday(deck_id)
        if(todayCards) variables.value.todayCards  = todayCards
   
        const { data:alreadyStudied } = await repositotyCard.getCardsAlreadyStudied(deck_id)
        if(alreadyStudied) variables.value.alreadyStudied   = alreadyStudied
     
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
  