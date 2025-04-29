import type { CardDTO } from "~/domain/interfaces/ICardRepository"

import { variables as variablesCards, methods as methodsCards } from "./studyList";
import { Card } from "~/domain/entities/Card";

export const variables = ref<Variables>({
    cards: [],
    next: false,
    atual: 0,
    flip:{
        rotate:false,
    },
    imgsFront:[],
    imgsBehind: [],
    difficulty:{
        sheet: false,
        facil: "4d",
        bom: "15m",
        dificil: "8m",
        agora: "agora",
        card_id: "",
    },
    menuItem: [
      { text: "Editar", icon: "mdi-rename", event:'Edit' },
      { text: "Apagar", icon: "mdi-delete", event:'Delete' },
    ],
    loading:false,
    clickTimeout: null,
    showBigImagen:false,
})

export const currentCard = computed(() => {
    if (variables.value.cards && variables.value.cards.length > 0 && variables.value.cards.length > variables.value.atual) {
        const current = variables.value.cards[variables.value.atual];

        methods.getImageCard(current)
        
        const difficulty_times = getNextTime(
          current.difficulty,
          current.last_time,
          current.difficulty
        );

        variables.value.difficulty.facil = difficulty_times.facil;
        variables.value.difficulty.bom = difficulty_times.bom;
        variables.value.difficulty.dificil = difficulty_times.dificil;
        variables.value.difficulty.agora = difficulty_times.agora;

        return current;
      }
      return "";
})


export const methods  = {
    cardsToday: async (deck_id:string) => {
        variables.value.cards = useShuffle(await methodsCards.getCardsToday(deck_id))
    },
    allCards: async (deck_id:string) => {
        variables.value.cards = useShuffle(await methodsCards.getCardsDeck(deck_id))
    },
    flip: () => {
        variables.value.flip.rotate = !variables.value.flip.rotate;
        variables.value.difficulty.sheet = true;
        variables.value.next = true;
    },
    backCard: () => {
        variables.value.flip.rotate = false;
        variables.value.difficulty.sheet = false;
        variables.value.next = false;
    },
    saveDifficulty: (card:Card) => {
        console.log(card)
        const repositoryCard = useCard()
        repositoryCard.updateDifficultyCard(card)
    },
    getNextTime(duration:string) {
        const now = new Date();

        // Regex para extrair valor e unidade
        const match = duration.match(/(\d+)([dhm])/);
        if (!match) throw new Error("Formato de duração inválido");

        const value = parseInt(match[1]);
        const unit = match[2];

        if (unit === "d") now.setDate(now.getDate() + value);
        if (unit === "h") now.setHours(now.getHours() + value);
        if (unit === "m") now.setMinutes(now.getMinutes() + value);

        // Formatar para o padrão desejado
        const formatted = now.toISOString().replace("T", " ").replace("Z", "").slice(0, -3); // Removendo 'Z' e reduzindo precisão

        return formatted;
    },
    setDifficulty: async (difficulty:difficulty) => {

        const card = variables.value.cards[variables.value.atual];

        variables.value.difficulty.sheet = false;
        variables.value.flip.rotate = false;

        await methods.saveDifficulty(new Card({
            id: card.id,
            created_at: card.created_at,
            difficulty: difficulty.level,
            last_time: difficulty.last_time,
            next_game: methods.getNextTime(difficulty.last_time),
            deck_id: card.deck_id,
            front: card.front,
            behind: card.behind,
        }));
  

        variables.value.next = false;
  
        if ( variables.value.atual + 1 ==  variables.value.cards.length) {
            methods.resetData()
            const router = useRouter()
            router.push("/fim");
        }

        variables.value.atual++;
    },
    resetData: () => {
        variables.value.cards = []
        variables.value.next = false
        variables.value.atual = 0
        variables.value.flip = {
            rotate:false,
        }
        variables.value.difficulty = {
            sheet: false,
            facil: "4d",
            bom: "15m",
            dificil: "8m",
            agora: "agora",
            card_id: "",
        }
    },
    refreshPage: () => {
        const router = useRouter()
        router.go(0);
    },
    getImageCard: async(card:CardDTO) => {

        const repositoryStorage = useStorage()
    
        if(!card || !card.id ) return ''
        
        variables.value.imgsBehind = []
        variables.value.imgsFront = []

        for (const img of card.images){
            const { data } = await repositoryStorage.getUrlFile(card.id || '', img.file_name)

            if( data?.url && img.location == 'front') {
                variables.value.imgsFront.push(data.url)
            }
            if( data?.url && img.location == 'behind') {
                variables.value.imgsBehind.push(data.url)
            }
        }

    },
    handleClick:() => {
        if (variables.value.clickTimeout) return;

        variables.value.clickTimeout = setTimeout(() => {
            variables.value.clickTimeout = null;
            methods.flip()
        }, 250);
    },
    handleDoubleClick:() => {
        if ( variables.value.clickTimeout) {
            clearTimeout(variables.value.clickTimeout);
            variables.value.clickTimeout = null;
        }
        variables.value.showBigImagen = true
        variables.value.difficulty.sheet = false
    
    }
}
interface difficulty {
    level: string,
    last_time: string
}
interface MenuItem {
    text: string;
    icon: string;
    event: string;
}


interface Variables {
    cards: CardDTO[],
    next: boolean,
    atual: number,
    imgsFront:string[],
    imgsBehind: string[],
    menuItem: MenuItem[],
    difficulty:{
        sheet: boolean,
        facil: string,
        bom:string,
        dificil:string,
        agora:string,
        card_id:string,
    },
    flip:{
        rotate:boolean,
    },
    loading:boolean,
    showBigImagen:boolean,
    clickTimeout:any
}
