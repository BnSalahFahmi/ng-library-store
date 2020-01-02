export interface Library {
    id: string;
    name: string;
    address: string;
    creationDate: Date;
}

export function initLibrabry(): Library {
    return {
        id: '',
        name: '',
        address: '',
        creationDate: null
    };
}
