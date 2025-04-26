export interface ApiResponse<T = any> {
    data?: T
    error?: string
    status?: number
}


export interface IStorage{
    createBucket(uuid:string):  Promise<ApiResponse>;
    uploadFile(uuid: string,file:File): Promise<ApiResponse>;
    getUrlFile(uuid: string,fileName: string): Promise<ApiResponse<{url:string}| null >>
    deleteFile(uuid: string, fileName: string): Promise<ApiResponse>;
}