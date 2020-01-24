import { IFile } from "./IFile";
import { IFileSystemObject } from "./IFileSystemObject";

export interface IDirectory extends IFileSystemObject {
    readonly subDirs: IDirectory[];
    
    readonly files: IFile[];

    readonly isEmpty: boolean;
}
