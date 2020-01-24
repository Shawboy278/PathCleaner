import { FileProcessorBase } from './FileProcessorBase';
import { Constants } from './FileProcessorCommon';
import { IFile } from '../Models/IFile';

export class FileTimeAttributeProcessor extends FileProcessorBase {
    private readonly _age: number;
    private readonly _refDate: Date;
    private readonly _getDateFunc: (file: IFile) => Date;

    public constructor(
        age: number,
        refDate: Date,
        getDateFunc: (file: IFile) => Date
    ) {
        super();

        this._age = age;
        this._refDate = refDate;
        this._getDateFunc = getDateFunc;
    }

    public isExpired(file: IFile) : boolean {
        const refTimeMs = this._refDate.getTime();
        const fileTimeMs = this._getDateFunc(file).getTime();

        const calculatedTimespan = (refTimeMs - fileTimeMs) / Constants.SingleDayMs
        const isExpired = calculatedTimespan >= this._age;

        return isExpired;
    }
}
