export interface IStudent {
    id: number;
    name: string;
    marks: number;
}

export const Student: IStudent[] = [
    {
        id: 1,
        name: 'John',
        marks: 45,
    },
    {
        id: 2,
        name: 'foo',
        marks: 90,
    }
];
