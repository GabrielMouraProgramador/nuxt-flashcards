import type { ApiResponse, IStorage } from "../interfaces/IStorage";


export class StorageSupabase implements IStorage{
    private supabase: ReturnType<typeof useSupabaseClient>;

    private allowedMimeTypes: string[] = [
        'image/*',       
        'text/plain',        
        'application/pdf',    
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.ms-excel', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    constructor(){
        this.supabase = useSupabaseClient();
    }
    async createBucket(uuid:string): Promise<ApiResponse>{
        try {
            const { error } = await this.supabase.storage.createBucket(
            uuid,
                {
                public: true,
                allowedMimeTypes:this.allowedMimeTypes,
                fileSizeLimit: 50428800
                }
            );
              
            if (error) throw error;

            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha criar o bucket', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    async uploadFile(uuid: string,file:File): Promise<ApiResponse>{
        try {
            const { error } = await  this.supabase.storage.from(uuid).upload(file.name , file, {
                upsert: true
            })

            if (error) throw error;

            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha modificar o arquivo', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    async getUrlFile(uuid: string,fileName: string): Promise<ApiResponse<{url:string} | null>>{
        try {
            const { data:file } = await this.supabase.storage.from(uuid).getPublicUrl(fileName)
    

            return { 
                data: file?.publicUrl ?  {
                    url: file.publicUrl
                }: null,
                status: 200
            };

        } catch (err:any) {
            console.error('Falha buscar a url', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
    async deleteFile(uuid: string, fileName: string): Promise<ApiResponse>{
        try {
            const { error } = await this.supabase.storage.from(uuid).remove([fileName]);
      
            if (error) throw error
            
            return { 
                data: {},
                status: 200
            };

        } catch (err:any) {
            console.error('Falha deletar o arquivo', err)
            return {
                error: err?.error || 'Erro desconhecido',
                status: err?.status || 500,
            }
        }
    }
}