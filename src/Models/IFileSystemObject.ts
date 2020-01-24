export interface IFileSystemObject {
    readonly path: string;

    delete(): void;
}
