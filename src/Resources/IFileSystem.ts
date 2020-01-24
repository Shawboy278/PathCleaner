export interface IFileSystem {
    doesFileExist(path: string): boolean;

    doesDirExist(path: string): boolean;

    isDir(path: string): boolean;

    getSubDirs(parentDir: string): string[];

    getFiles(parentDir: string): string[];

    getLastModifiedTime(path: string): Date;

    deleteFile(path: string): void;

    deleteDir(path: string): void;
}
