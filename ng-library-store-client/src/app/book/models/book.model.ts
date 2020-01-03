export interface Book {
    id: string;
    name: string;
    description: string;
    author: string;
    urlPhoto: string;
    creationDate: Date;
    libraries: object[];
}

export function initBook(): Book {
    return {
        id: '',
        name: '',
        description: '',
        author: '',
        urlPhoto: '',
        creationDate: null,
        libraries: []
    };
}
