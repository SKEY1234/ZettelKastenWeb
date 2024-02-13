import axios, { AxiosError, AxiosResponse } from "axios";
import { INote } from "../models/INote";
import { BaseResponse } from "../models/responses/BaseResponse";
import { ITag } from "../models/ITag";
import { INoteTagRelation } from "../models/INoteTagRelation";

export const data = [
    { title: "title1", content: "content1" },
    { title: "title2", content: "content2" },
    { title: "title3", content: "content3" },
    { title: "title4", content: "content4" },
    { title: "title5", content: "content5" },
    { title: "title6", content: "content6" },
    { title: "title7", content: "content7" },
    { title: "title8", content: "content8" },
    { title: "title9", content: "content9" },
    { title: "title10", content: "content10" },
    { title: "title11", content: "content11" },
    { title: "title12", content: "content12" },
    { title: "title13", content: "content13" },
    { title: "title14", content: "content14" },
    { title: "title15", content: "content15" },
];

export async function getNotes(): Promise<BaseResponse<INote[]>> {
    try {
        const response = await axios.get<BaseResponse<INote[]>>(`${process.env.REACT_APP_API_URL}/notes/GetAll`);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function deleteNote(noteId: string): Promise<BaseResponse<INote[]>> {
    try {
        const response = await axios.delete<BaseResponse<INote[]>>(`${process.env.REACT_APP_API_URL}/notes/Delete?noteId=${noteId}`);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function createNote(note: INote): Promise<BaseResponse<string>> {
    try {
        const response = await axios.post<BaseResponse<string>>(`${process.env.REACT_APP_API_URL}/notes/Create`, note);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function updateNote(note: INote): Promise<BaseResponse<INote[]>> {
    try {
        const response = await axios.put<BaseResponse<INote[]>>(`${process.env.REACT_APP_API_URL}/notes/Update`, note);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function getTags(): Promise<BaseResponse<ITag[]>> {
    try {
        const response = await axios.get<BaseResponse<ITag[]>>(`${process.env.REACT_APP_API_URL}/tags/GetAll`);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function deleteTag(tagId: string): Promise<BaseResponse<ITag[]>> {
    try {
        const response = await axios.delete<BaseResponse<ITag[]>>(`${process.env.REACT_APP_API_URL}/tags/Delete?tagId=${tagId}`);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function createTag(tag: ITag): Promise<BaseResponse<ITag[]>> {
    try {
        const response = await axios.post<BaseResponse<ITag[]>>(`${process.env.REACT_APP_API_URL}/tags/Create`, tag);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function updateTag(tag: ITag): Promise<BaseResponse<ITag[]>> {
    try {
        const response = await axios.put<BaseResponse<ITag[]>>(`${process.env.REACT_APP_API_URL}/tags/Update`, tag);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function getNoteTagRelations(): Promise<BaseResponse<INoteTagRelation[]>> {
    try {
        const response = await axios.get<BaseResponse<INoteTagRelation[]>>(`${process.env.REACT_APP_API_URL}/noteTagRelations/GetAll`);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function createNoteTagRelation(noteTagRelation: INoteTagRelation): Promise<BaseResponse<void>> {
    try {
        const response = await axios.post<BaseResponse<void>>(`${process.env.REACT_APP_API_URL}/noteTagRelations/Create`, noteTagRelation);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}

export async function deleteNoteTagRelation(relationId: string): Promise<BaseResponse<void>> {
    try {
        const response = await axios.delete<BaseResponse<void>>(`${process.env.REACT_APP_API_URL}/noteTagRelations/Delete?relationId=${relationId}`);
        return response?.data;
    } catch (e: unknown) {
        const error = e as AxiosError;
        const response = error?.response as AxiosResponse;
        return response?.data;
    }
}