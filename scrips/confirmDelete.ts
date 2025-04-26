import { defineEmits, type EmitFn } from "vue";

export const variables = ref<Variables>({
    active: false,
    text: "",
    value: "",
})

let onConfirm: (() => void) | null = null;

export const methods  = {
    confirmDelete: (id:string, name:string, callback: () => void) => {
        variables.value = {
            active: true,
            text: `Tem certeza de que deseja excluir: ${name} ?`,
            value: id,
        };
        onConfirm = callback;
    },
      
    deleteItem: (emit: EmitFn)  => {
        if (onConfirm) {
            onConfirm();
            onConfirm = null;
        }


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
  