import { FileProcessorTypes } from './FileProcessorTypes';
import { IFile } from '../Models/IFile';

export interface IGetDateFuncFactory {
    create(processorType: FileProcessorTypes): (file: IFile) => Date;
}
