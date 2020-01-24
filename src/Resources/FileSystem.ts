import fs from 'fs';
import path from 'path';

import { IFileSystem } from './IFileSystem';
import { PathCleanerError } from '../PathCleanerError';

export class FileSystem implements IFileSystem {
    constructor() {
    }

    public doesFileExist(path: string): boolean {
        const doesFileExist = this.doesExists(path);
        return doesFileExist;
    }

    public doesDirExist(path: string): boolean {
        const doesDirExist = this.doesExists(path);
        return doesDirExist;
    }

    public isDir(path: string): boolean {
        this.validateDir(path);

        const stat = fs.statSync(path);
        const isDir = stat.isDirectory();

        return isDir;
    }

    public getSubDirs(parentDir: string): string[] {
        this.validateDir(parentDir);
    
        const subDirs = fs.readdirSync(parentDir)
            .map(dirName => path.join(parentDir, dirName))
            .filter(subDir => fs.statSync(subDir).isDirectory());
    
        return subDirs;
    }

    public getFiles(parentDir: string): string[] {
        this.validateDir(parentDir);
    
        const files = fs.readdirSync(parentDir)
            .map(fileName => path.join(parentDir, fileName))
            .filter(file => fs.statSync(file).isFile());
    
        return files;
    }

    public getLastModifiedTime(path: string): Date {
        this.validateDir(path);
    
        const lastModifiedTime = fs.statSync(path)
            .mtime;
            
        return lastModifiedTime;
    }

    public deleteFile(path: string): void {
        fs.unlinkSync(path);
    }

    public deleteDir(path: string): void {
        fs.rmdirSync(path);
    }

    protected validateDir(path: string): void {
        if (!this.doesExists(path)) {
            throw new PathCleanerError(`The directory '${path}' does not exist.`)
        }
    }

    // TODO: How do you test/mock this?
    private doesExists(path: string): boolean {
        const exists = fs.existsSync(path);
        return exists;
    }
}
