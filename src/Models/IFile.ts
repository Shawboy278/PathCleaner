import { IFileSystemObject } from './IFileSystemObject';

export interface IFile extends IFileSystemObject {
    readonly lastModifiedTime: Date;
}
