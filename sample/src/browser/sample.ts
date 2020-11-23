
export const SAMPLE_ID = 'sample';

export interface Group {
    groupName: string,
    members: Person[]
}

export interface Person {
    firstName: string,
    lastName: string,
}
