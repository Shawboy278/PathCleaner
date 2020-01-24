#!/usr/bin/env node

import { getSettingsAsync } from './Configuration/Config';
import { getContainerAsync, SERVICES } from './Configuration/Registry';
import { PathCleanerError } from './PathCleanerError';
import { IDirectoryFactory } from './Models/IDirectoryFactory';
import { IFileProcessor } from './Processors/IFileProcessor';

async function mainAsync(argv: string[]): Promise<void> {
    try {
        const settings = await getSettingsAsync(argv);
        const container = await getContainerAsync(settings);

        console.log(`Let's clean '${settings.path}'!!!`);

        const dirFactory = container.get<IDirectoryFactory>(SERVICES.DirectoryFactory);
        const baseDir = dirFactory.create(settings.path);
        
        const fileProcessor = container.get<IFileProcessor>(SERVICES.FileProcessor);
        fileProcessor.process(baseDir, false);

    } catch(err) {
        if (err instanceof PathCleanerError) {
            const pcError = err as PathCleanerError;
            console.log(pcError.message);
        } else {
            console.error(err);
        }

        process.exit(1);
    }
}

mainAsync(process.argv);
