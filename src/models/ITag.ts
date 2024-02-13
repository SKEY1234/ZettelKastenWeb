export interface ITag {
    key: React.Key;
    tagId: string | undefined;
    name: string;
    color: string;
    createdOn: Date;
    checked: boolean;
}