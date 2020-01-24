import { FileSystem } from './FileSystem';
import { IEnvironment } from './IEnvironment';
import { IFileSystem } from './IFileSystem';

export class FileSystemFactory {
    private _env: IEnvironment;

    constructor(
        env: IEnvironment
    ) {
        this._env = env;
    }

    public create(): IFileSystem {
        switch (this._env.platform) {
            case 'darwin':
            default:
                return new FileSystem();
        }
    }
}
