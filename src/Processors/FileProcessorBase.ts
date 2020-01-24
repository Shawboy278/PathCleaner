import { IFileProcessor } from "./IFileProcessor";
import { IDirectory } from "../Models/IDirectory";
import { IFile } from "../Models/IFile";

export abstract class FileProcessorBase implements IFileProcessor {
    public abstract isExpired(file: IFile): boolean;

    public process(
        dir: IDirectory,
        allowEmptyDelete: boolean = true)
    : void {
        dir.subDirs.forEach((subDir: IDirectory) => {
            this.process(subDir);
        });

        console.log(`Examining files of '${dir.path}'`);
        dir.files.forEach((file: IFile) => {
            if (this.isExpired(file)) {
                console.log(`  Deleting file '${file.path}'`);
                file.delete();
            }
        });
    
        if (allowEmptyDelete && dir.isEmpty) {
            console.log(`Deleting dir '${dir.path}'`);
            dir.delete();
        }
    }
}
