export interface Book {
    id: string;
    name: string;
    description: string;
    urlPhoto: string;
    creationDate: Date;
    libraries: object[];
}

export function initBook(): Book {
    return {
        id: '',
        name: '',
        description: '',
        urlPhoto: '',
        creationDate: null,
        libraries: []
    };
}
