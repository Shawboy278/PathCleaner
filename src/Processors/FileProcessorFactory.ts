import { FileProcessorTypes } from './FileProcessorTypes';
import { FileTimeAttributeProcessor } from './FileTimeAttributeProcessor';
import { IFileProcessor } from './IFileProcessor';
import { IGetDateFuncFactory } from './IGetDateFuncFactory';
import { Settings } from '../Configuration/Settings';
import { PathCleanerError } from '../PathCleanerError';
import { IEnvironment } from '../Resources/IEnvironment';

export class FileProcessorFactory {
    private readonly _env: IEnvironment;
    private readonly _settings: Settings;
    private readonly _getDateFuncFactory: IGetDateFuncFactory;

    constructor(
        env: IEnvironment,
        settings: Settings,
        getDateFuncFactory: IGetDateFuncFactory
    ) {
        this._env = env;
        this._settings = settings;
        this._getDateFuncFactory = getDateFuncFactory;
    }
    
    public create(): IFileProcessor {
        const processorType = this._settings.processorType;

        switch(processorType)
        {
            case FileProcessorTypes.LastModifiedTime:
                const getDateFunc = this._getDateFuncFactory.create(
                    processorType);
                return new FileTimeAttributeProcessor(
                    this._settings.age,
                    this._env.now,
                    getDateFunc);

            default:
                throw new PathCleanerError(`Supported for type '${processorType}' has not been configured yet.`);
        }
    }
}
