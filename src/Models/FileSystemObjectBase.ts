import { IFileSystemObject } from "./IFileSystemObject";
import { IFileSystem } from "../Resources/IFileSystem";

export abstract class FileSystemObjectBase implements IFileSystemObject {
    private readonly _fs: IFileSystem;
    private readonly _path: string;

    constructor(
        fs: IFileSystem,
        path: string
    ) {
        this._fs = fs;
        this._path = path;
    }

    public get path(): string {
        return this._path;
    }

    protected get fs(): IFileSystem {
        return this._fs;
    }

    public abstract delete(): void;
}
