import { defineEmits, type EmitFn } from "vue";

export const variables = ref<Variables>({
    active: false,
    text: "",
    value: "",
})


export const methods  = {
    confirmDelete: (id:string, name:string) => {
        variables.value = {
            active: true,
            text: `Tem certeza de que deseja excluir: ${name} ?`,
            value: id,
        };
    },
      
    deleteItem: (emit: EmitFn)  => {
        emit("delete", variables.value.value);
        variables.value = {
            active: false,
            text: "",
            value: "",
        };
    }
}



interface Variables {
    active: boolean,
    text: string,
    value: string,
}
  