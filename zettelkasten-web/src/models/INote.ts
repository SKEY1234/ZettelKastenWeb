export interface INote {
    noteId: string | undefined;
    title: string;
    content: string;
    createdOn: Date;
    checked: boolean;
}