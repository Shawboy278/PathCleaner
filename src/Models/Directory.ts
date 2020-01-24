import { File } from './File';
import { FileSystemObjectBase } from './FileSystemObjectBase';
import { IDirectory } from './IDirectory';
import { IFile } from './IFile';
import { IFileSystem } from '../Resources/IFileSystem';

export class Directory extends FileSystemObjectBase implements IDirectory {
    constructor(
        fs: IFileSystem,
        path: string
    ) {
        super(fs, path);
    }

    public get subDirs(): IDirectory[] {
        const subDirs = new Array<IDirectory>();
        this.fs.getSubDirs(this.path)
            .forEach(subDir => subDirs.push(
                new Directory(this.fs, subDir)));

        return subDirs;
    }
    
    public get files(): IFile[] {
        const files = new Array<IFile>();
        this.fs.getFiles(this.path)
            .forEach(file => files.push(
                new File(this.fs, file)));

        return files;
    }

    public delete(): void {
        this.fs.deleteDir(this.path);
    }

    public get isEmpty(): boolean {
        const isEmpty = this.subDirs.length == 0 && this.files.length == 0;
        return isEmpty;
    }
}
