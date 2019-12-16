export interface Book {
    id: string;
    name: string;
    description: string;
    urlPhoto: string;
    libraries: object[];
}

export function initBook(): Book {
    return {
        id: '',
        name: '',
        description: '',
        urlPhoto: '',
        libraries: []
    };
}
