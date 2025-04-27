import type { Card } from "../entities/Card";

export interface ApiResponse<T = any> {
    data?: T
    error?: string
    status?: number
}
export interface CardDTO {
    id: string | null
    created_at: string 
    difficulty: string
    last_time: string
    deck_id: string
    front: string
    behind: string
    next_game: string

    images: ImgCardDTO[]
}
export interface ImgCardDTO {
    id:string
    card_id: string,
    location:string,
    file_name: string,
    sort: number,
    created_at: string 
}

export interface ICardRepository{
    createCard(card:Card): Promise<ApiResponse<{ id: string }>>
    updateCard(card:Card): Promise<ApiResponse>
    deleteCard(card_id: string): Promise<ApiResponse>
    updateDifficultyCard(card:Card): Promise<ApiResponse>
    getCardsToday(deck_id:string): Promise<ApiResponse<CardDTO[]>>
    getCardsAlreadyStudied(deck_id:string): Promise<ApiResponse<CardDTO[]>>
    getCardsByDeckId(deck_id:string): Promise<ApiResponse<CardDTO[]>>
    addImageCard(card_id:string, fileName:string,location:string,sort:number ): Promise<ApiResponse>
    getImagesCard(card_id:string): Promise<ImgCardDTO[]>
}  