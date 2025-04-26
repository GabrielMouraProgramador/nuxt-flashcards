
import type { CardDTO } from "~/domain/interfaces/ICardRepository";
import { variables as variablesCards, methods as methodsCards } from "./studyList";
import { variables as variablesDelete, methods as methodsDelete  } from "@/scrips/confirmDelete";

export const variables = ref<Variables>({
    search: "",
    loading:false,
    cards: [],
    info: {},
    menuDeck: [
        { text: "Editar", icon: "mdi-rename", event: 'EditCard' },
        { text: "Apagar", icon: "mdi-delete", event: 'DeleteCard'},
    ],
})

export const searched = computed(() => {
    const search = variables.value.search
    const cards  = variablesCards.value.allCards
    if (!search || search == "") {
        return cards;
      }
      // Função para remover caracteres especiais e acentuação
      const normalizeString = (str:string) => {
        return str
          .normalize("NFD") // Decomposição de caracteres (ex: "á" vira "a" + "́")
          .replace(/[\u0300-\u036f]/g, "") // Remove os sinais diacríticos (acentos)
          .toLowerCase(); // Converte para minúsculo
      };
  
      return cards.filter((obj:CardDTO) => {
        // Concatena e normaliza os campos 'frete' e 'tras'
        const texto = `${obj.front || ""} ${obj.behind || ""}`.toLowerCase();
  
        // Normaliza tanto o texto de busca quanto os dados para ignorar acentuação
        return normalizeString(texto).includes(normalizeString(search));
      });

})

export const methods  = {
    deteleCard: async (card_id:string) => {
        const repositotyCard = useCard()
        await repositotyCard.deleteCard(card_id)
        methods.refreshPage()
    },
    refresh: async (deck_id:string) =>  {
        variables.value.loading = true;
        variables.value.cards = await methodsCards.getCardsDeck(deck_id);
        variables.value.info = await methodsCards.getInfoDeck(deck_id);
        variables.value.loading = false;
    },
    confirmDeleteCard: (card:CardDTO) => {
        methodsDelete.confirmDelete(card.id || '', card.front, () => methods.deteleCard(card.id || '') )
    },
    refreshPage: () => {
        const router = useRouter()
        router.go(0);
    },
}

interface MenuItem {
    text: string;
    icon: string;
    event: string;
}

interface Variables {
    search: string,
    loading:boolean,
    cards: CardDTO[],
    info: {},
    menuDeck:MenuItem[]
}
  