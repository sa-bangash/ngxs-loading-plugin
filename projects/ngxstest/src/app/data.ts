export interface IStudent {
    id: number;
    name: string;
    approved: boolean;
}

export const Student: IStudent[] = [
    {
        id: 1,
        name: 'John',
        approved: false
    },
    {
        id: 2,
        name: 'foo',
        approved: false
    }
];
