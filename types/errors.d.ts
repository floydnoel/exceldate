export class ArgError extends TypeError {
    constructor(description?: string);
    code: string;
    description: string;
}
