import { Card } from "~/domain/entities/Card"
import type { CardDTO } from "~/domain/interfaces/ICardRepository"

export const variables = ref<Variables>({
    showDialog: false,
    typeAction:'CREATE',
    card_id:'',
    front: {
        text: "",
        file: [],
    },
    behind:{
        text: "",
        file: [],
    },
    loading: false,
})



export const methods  = {
    addCard: async (deck_id:string) => {
        const repositotyCard = useCard()
        const repositoryStorage = useStorage()

        const filesFront = variables.value.front.file 
        const filesBehind = variables.value.behind.file 

        const { data } = await repositotyCard.createCard(new Card({
            deck_id: deck_id,
            front: variables.value.front.text,
            behind: variables.value.behind.text,
        }))

        const cardId = (data?.id) ? data.id : null
        
        if(!cardId) return


        await repositoryStorage.createBucket(cardId)

   
        for (const fileFront of filesFront){
            if(fileFront?.name){

                await repositotyCard.addImageCard(
                    cardId,
                    fileFront.name,
                    'front',
                    0,
                )
                await repositoryStorage.uploadFile(cardId, fileFront)
            }
        }  
    

        for (const fileBehind of filesBehind){
            if(fileBehind?.name){

                await repositotyCard.addImageCard(
                    cardId,
                    fileBehind.name,
                    'behind',
                    0,
                )
                await repositoryStorage.uploadFile(cardId, fileBehind)
            }
        }  

        


        methods.refreshPage()
    },
    updateCard: async (deck_id:string) => {
        const repositotyCard = useCard()
        const repositoryStorage = useStorage()

     

        await repositotyCard.updateCard(new Card({
            id: variables.value.card_id,
            deck_id: deck_id,
            front: variables.value.front.text,
            behind: variables.value.behind.text,
        }))

        // if(filefront && filefront?.name ){
        //     await repositoryStorage.uploadFile(variables.value.card_id, filefront)
        //     await repositotyCard.updateCard(new Card({
        //         id: variables.value.card_id,
        //         deck_id: deck_id,
        //         front: variables.value.front.text,
        //         behind: variables.value.behind.text,
        //         fileNameFront: filefront.name,
        //     }))
        // }
        // if(fileBehind && fileBehind?.name){
        //     await repositoryStorage.uploadFile(variables.value.card_id, fileBehind)
        //     await repositotyCard.updateCard(new Card({
        //         id: variables.value.card_id,
        //         deck_id: deck_id,
        //         front: variables.value.front.text,
        //         behind: variables.value.behind.text,
        //         fileNameBehind: fileBehind.name,
        //     }))
        // } 
    

        methods.refreshPage()
    },
    activeMethod: async (deck_id:string) => {
        if(variables.value.typeAction === 'CREATE') await  methods.addCard(deck_id)
        if(variables.value.typeAction === 'EDIT') await methods.updateCard(deck_id)
    },
    showForm:(action: 'CREATE'| 'EDIT', card?:CardDTO) => {
        variables.value.typeAction = action === "EDIT" ? "EDIT" : "CREATE";
        variables.value.showDialog = true
        if(variables.value.typeAction === 'EDIT' && card  && card.id){
            variables.value.card_id = card.id 
            variables.value.front = {
                text: card.front,
                file: [],
            }
            variables.value.behind = {
                text:card.behind,
                file: [],
            }
        }
    },
    cleanForm: () => {
        variables.value.typeAction = 'CREATE',
        variables.value.card_id = ''
        variables.value.front = {
            text: "",
            file: [],
        }
        variables.value.behind = {
            text: "",
            file: [],
        }
    },
    refreshPage: () => {
        const router = useRouter()
        router.go(0);
    },
    urlToFile: async (url:string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        
        // Tenta extrair o tipo MIME
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        
        // Gera um nome baseado na URL
        const urlParts = url.split('/');
        let filename = urlParts[urlParts.length - 1].split('?')[0]; // Remove parâmetros da URL
        
        // Se não tiver nome, gera um aleatório
        if (!filename || !filename.includes('.')) {
            const extension = contentType.split('/')[1] || 'bin';
            filename = `file_${Date.now()}.${extension}`;
        }
        
        return new File([blob], filename, { type: contentType });
    }
      
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
        file: File[],
    },
    behind:  {
        text: string,
        file: File[],
    },
    loading: boolean,
}
  