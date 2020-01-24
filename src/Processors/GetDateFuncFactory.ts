import { FileProcessorTypes } from './FileProcessorTypes';
import { IGetDateFuncFactory } from './IGetDateFuncFactory';
import { IFile } from '../Models/IFile';
import { PathCleanerError } from '../PathCleanerError';

export class GetDateFuncFactory implements IGetDateFuncFactory {
    create(processorType: FileProcessorTypes): (file: IFile) => Date {
        var getDateFunc: (file: IFile) => Date;

        switch(processorType)
        {
            case FileProcessorTypes.LastModifiedTime:
                getDateFunc = file => file.lastModifiedTime;
                break;

            default:
                throw new PathCleanerError(`Support for type '${processorType}' has not been configured yet.`);
        }

        return getDateFunc;
    }
}
