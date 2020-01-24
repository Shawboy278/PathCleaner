import fs from 'fs';
import commander, { Command } from 'commander'

//import * as io from '../Resources/IO';
import { PathCleanerError } from '../PathCleanerError';
import { FileProcessorTypes } from '../Processors/FileProcessorTypes';
import { Settings } from './Settings';

const dirSeparators = ['/', '\\'];
const defaultFileProcessorType = FileProcessorTypes[FileProcessorTypes.LastModifiedTime];
const defaultFileAge = 15;

export async function getSettingsAsync(argv : string[]) : Promise<Settings> {
    const command = new commander.Command()
        .description("Command utility for removing old files.")
        .version("2.0.0")
        .option(
            "-p|--path <path>",
            "The path to clean",
            undefined)
        .option(
            "-a|--age <age>",
            "The maximum age of a file",
            defaultFileAge)
        .option(
            "-s|--source <source>",
             "The source of the object's age",
            defaultFileProcessorType);

    command.parse(argv);
    await validateSettingsAsync(command);

    const settings = new Settings(
        command.path,
        command.age,
        command.source
    );

    return settings;
}

async function validateSettingsAsync(command: Command): Promise<void> {
    if (command.path === undefined) {
        throw new PathCleanerError('You must provide a path.');
    }

    const doesExist = fs.existsSync(command.path);
    if (!doesExist) {
        throw new PathCleanerError(`The path '${command.path}' does not exist.`);
    }

    const isDirectory = fs.existsSync(command.path) && fs.statSync(command.path).isDirectory;
    if (!isDirectory) {
        throw new PathCleanerError(`The path '${command.path}' is not a directory`);
    }
    command.path = trimSlash(command.path);

    if (command.age <= 0) {
        throw new PathCleanerError(`The age '${command.age}' cannot be equal or less than 0.`);
    }

    command.source = enumParse(command.source);
}

function trimSlash(path: string): string {
    while(isDirSeparator(path[path.length - 1])) {
        path = path.substr(0, path.length - 1);
    }

    return path;
}

function isDirSeparator(char: string): boolean {
    const is = dirSeparators.includes(char);
    return is;
}

function enumParse(key: string): FileProcessorTypes {
    let enumValue: FileProcessorTypes | null = null;

    for (let type in FileProcessorTypes) {
        if (isNaN(Number(type)) && type.toLowerCase() === key.toLowerCase()) {
            const enumKey = type as keyof typeof FileProcessorTypes;
            enumValue = FileProcessorTypes[enumKey];
            break;
        }
    }

    if (enumValue == null)
    {
        // TODO: Is there no nameof(FileProcessorTypes) equiv that can be used?
        throw new PathCleanerError(`Cannot parse '${key}' to enum type FileProcessorTypes.`);
    }
    
    return enumValue;
}
