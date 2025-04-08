export const allowedMimeTypes = [
    'image/*',            // Imagens (qualquer formato)
    'text/plain',         // Arquivos de texto (.txt)
    'application/pdf',    // PDFs (.pdf)
    'application/msword', // Documentos do Word (.doc)
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Documentos do Word (.docx)
    'application/vnd.ms-excel', // Planilhas do Excel (.xls)
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Planilhas do Excel (.xlsx)
];


export function useStorage() {
    const supabase = useSupabaseClient()
    // Add deck
    async function createBucket(nameBucket: string): Promise<void> {
        const { error } = await supabase.storage.createBucket(
          nameBucket,
            {
              public: true,
              allowedMimeTypes:allowedMimeTypes,
              fileSizeLimit: 50428800 // 100 × 1024 × 1024bytes = 50 MB
            }
          );
    
        if (error) throw new Error("Falha ao criar bucket");
        
        return;
      }

    async function uploadFile(nameBucket: string,file:File) {
    
        const { error } = await  supabase.storage.from(nameBucket).upload(file.name , file, {
          upsert: true
        })
    
        if (error) throw new Error("Falha ao fazer upload de arquivo");
        
        return;
      }

      async function getUrlFile(bucketName: string,fileName: string) {
 
        try{

          
          const { data:file } = await supabase.storage.from(bucketName).getPublicUrl(fileName)
    
          return file?.publicUrl || '';
    
        }catch(err){
            throw new Error("Falha ao resgatar imagem");
        

        }
    
      }

      return {
        createBucket,
        uploadFile,
        getUrlFile
      }
}