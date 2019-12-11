export interface Library {
    id: string;
    name: string;
    address: string;
}

export function initLibrabry(): Library {
    return {
        id: '',
        name: '',
        address: ''
    };
}
