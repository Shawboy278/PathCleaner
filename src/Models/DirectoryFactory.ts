import { Directory } from './Directory';
import { IDirectoryFactory } from './IDirectoryFactory';
import { IDirectory } from './IDirectory';
import { IFileSystem } from 'Resources/IFileSystem';

export class DirectoryFactory implements IDirectoryFactory {
    private readonly _fs: IFileSystem;

    constructor(
        fs: IFileSystem
    ) {
        this._fs = fs;
    }

    public create(path: string): IDirectory {
         var dir = new Directory(
             this._fs,
             path);
         return dir;
    }
}
