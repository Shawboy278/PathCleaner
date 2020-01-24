import { FileSystemObjectBase } from "./FileSystemObjectBase";
import { IFile } from "./IFile";
import { IFileSystem } from "../Resources/IFileSystem";

export class File extends FileSystemObjectBase implements IFile {
    constructor(
        fs: IFileSystem,
        path: string
    ) {
        super(fs, path);
    }

    public get lastModifiedTime(): Date {
        const lastModifiedTime = this.fs.getLastModifiedTime(this.path);
        return lastModifiedTime;
    }

    public delete(): void {
        this.fs.deleteFile(this.path);
    }
}
