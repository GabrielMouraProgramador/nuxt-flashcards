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
})

export const currentCard = computed(() => {
    if (variables.value.cards && variables.value.cards.length > 0 && variables.value.cards.length > variables.value.atual) {
        const current = variables.value.cards[variables.value.atual];

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
        variables.value.cards = await methodsCards.getCardsToday(deck_id)
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
        const repositoryCard = useCard()
        repositoryCard.updateDifficultyCard(card)
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
            next_game: card.next_game,
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
}
  