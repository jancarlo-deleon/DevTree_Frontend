import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User, UserHandle } from "../types";

interface UpdateProfileResponse {
    msg: string;
}

interface SearchResponse {
    msg: string;
}

export async function getUser() {
    try {

        const { data } = await api.get<User>("/user");

        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateProfile(formData: User) {
    try {
        const { data } = await api.patch<UpdateProfileResponse>("/user", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
        const { data: {image}} : {data:{image:string}} = await api.post("/user/image", formData);
        return image;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const URL = `/${handle}`;
        const { data } = await api.get<UserHandle>(URL);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function searchByHandle(handle: string) {
    try {
        const URL = `/search`;
        const { data } = await api.post<SearchResponse>(URL, {
            handle:handle
        });
        return data.msg;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}