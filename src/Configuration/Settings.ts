import { FileProcessorTypes } from '../Processors/FileProcessorTypes';

export class Settings {
    constructor(
        path: string,
        age: number,
        processorType: FileProcessorTypes
    ) {
        this.path = path;
        this.age = age;
        this.processorType = processorType;
    }

    public readonly path: string;
    public readonly age: number;
    public readonly processorType: FileProcessorTypes;
}
