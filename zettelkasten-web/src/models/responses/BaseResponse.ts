export class BaseResponse<T> {
    isSuccess: boolean = false;
    errors: string[] = [];
    value: T | null = null;
}