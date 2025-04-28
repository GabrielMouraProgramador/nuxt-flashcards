import { Card } from "~/domain/entities/Card"
import type { CardDTO } from "~/domain/interfaces/ICardRepository"
import { methods as methodsCard } from "@/scrips/studyList";


export const variables = ref<Variables>({
    showDialog: false,
    typeAction:'CREATE',
    card_id:'',
    front: {
        text: "<p><br></p><p><br></p><p><br></p>",
        file: [],
    },
    behind:{
        text: "<p><br></p><p><br></p><p><br></p>",
        file: [],
    },
    loading: false,
    tab: 'frente',
})



export const methods  = {
    addCard: async (deck_id:string) => {
        variables.value.loading = true
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

        


        methods.cleanForm() 
        methodsCard.refresh(deck_id);
        variables.value.showDialog = true
        variables.value.loading = false
        
    },
    updateCard: async (deck_id:string) => {
        variables.value.loading = true
        const repositotyCard = useCard()

        await repositotyCard.updateCard(new Card({
            id: variables.value.card_id,
            deck_id: deck_id,
            front: variables.value.front.text,
            behind: variables.value.behind.text,
        }))
    
        methods.refreshPage()
        variables.value.loading = false
    },
    activeMethod: async (deck_id:string) => {
        if(variables.value.typeAction === 'CREATE') await  methods.addCard(deck_id)
        if(variables.value.typeAction === 'EDIT') await methods.updateCard(deck_id)
    },
    showForm: async(action: 'CREATE'| 'EDIT', card?:CardDTO) => {
        variables.value.typeAction = action === "EDIT" ? "EDIT" : "CREATE";
        variables.value.showDialog = true
        if(variables.value.typeAction === 'EDIT' && card  && card.id){

            console.log(card)
            variables.value.card_id = card.id 
            variables.value.front = {
                text: card.front,
                file:[],
            }
            variables.value.behind = {
                text:card.behind,
                file: [],
            }

            const imagesCard = await methods.getImagesCard(card)
            console.log(imagesCard)
            Array.from(imagesCard.imgsFront).map((url) => {
                methods.urlToFile(url as string).then((url) => {
                  if(url) variables.value.front.file.push(url) 
                })
            })
            Array.from(imagesCard.imgsBehind).map((url) => {
                methods.urlToFile(url as string).then((url) => {
                  if(url) variables.value.behind.file.push(url) 
                })
            })
        }
    },
    cleanForm: () => {
        variables.value.typeAction = 'CREATE',
        variables.value.card_id = ''
        variables.value.front = {
            text: "<p><br></p><p><br></p><p><br></p>",
            file: [],
        }
        variables.value.behind = {
            text: "<p><br></p><p><br></p><p><br></p>",
            file: [],
        }
        variables.value.tab = 'frente'
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
    },
    getImagesCard: async(card:CardDTO): Promise<{
        imgsBehind: any,
        imgsFront: any,
    }> => {
    
            const repositoryStorage = useStorage()
        
            if(!card || !card.id ) throw new Error('Falha Card invalido')
            
            const imgsBehind = []
            const imgsFront = []

            for (const img of card.images){
                const { data } = await repositoryStorage.getUrlFile(card.id || '', img.file_name)
    
                if( data?.url && img.location == 'front') {
                    imgsFront.push(data.url)
                }
                if( data?.url && img.location == 'behind') {
                    imgsBehind.push(data.url)
                }
            }
            return {
                imgsFront: imgsFront || [],
                imgsBehind: imgsBehind || [],
            }
    
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
    tab:string,
}
  