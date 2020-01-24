import { IDirectory } from '../Models/IDirectory';
import { IFile } from '../Models/IFile';

export interface IFileProcessor {
    isExpired(
            file: IFile)
        : boolean;

    process(
            dir: IDirectory,
            allowEmptyDelete: boolean)
        : void;
}
