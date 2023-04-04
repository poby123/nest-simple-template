export interface FieldError {
    field: string;
    value: string | number;
    reason: string;
}

export interface ErrorResponseType {
    status: number;
    code: string;
    message: string;
    errors: Array<FieldError>
}

export interface ErrorCodeType {
    [key: string]: ErrorResponseType
}