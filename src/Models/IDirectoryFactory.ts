import { IDirectory } from "./IDirectory";

export interface IDirectoryFactory {
    create(path : string): IDirectory;
}
