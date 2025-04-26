
export const variables = ref<Variables>({
    dialog: false,
    frete: "",
    tras: "",
    fileFrente: null,
    fileTras: null,
    loading: false,
})



export const methods  = {
    addCard: async () => {
        const repositotyCard = useCard()
    }
}

interface Variables {
    dialog: boolean,
    frete: string,
    tras: string,
    fileFrente: File | null,,
    fileTras: File | null,
    loading: boolean,
}
  