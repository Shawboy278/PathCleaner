import { Container, interfaces, AsyncContainerModule } from 'inversify';

import { Settings } from "./Settings";
import { DirectoryFactory } from '../Models/DirectoryFactory';
import { IDirectoryFactory } from '../Models/IDirectoryFactory';
import { FileProcessorFactory } from '../Processors/FileProcessorFactory';
import { GetDateFuncFactory } from '../Processors/GetDateFuncFactory';
import { IFileProcessor } from "../Processors/IFileProcessor";
import { IGetDateFuncFactory } from '../Processors/IGetDateFuncFactory';
import { IFileSystem } from '../Resources/IFileSystem';
import { FileSystemFactory } from '../Resources/FileSystemFactory';
import { Environment } from '../Resources/Environment';
import { IEnvironment } from '../Resources/IEnvironment';

export const SERVICES = {
    DirectoryFactory: Symbol.for("DirectoryFactory"),
    Environment: Symbol.for("Environment"),
    FileProcessor: Symbol.for("FileProcessor"),
    FileSystem: Symbol.for("FileSystem"),
    GetDateFuncFactory: Symbol.for("GetDateFuncFactory"),
    Logger: Symbol.for("Logger"),
    Settings: Symbol.for("Settings")
};

export async function getContainerAsync(settings: Settings): Promise<Container> {
    const container = new Container();
    await container.loadAsync(
        getDirectoryFactoryModule(),
        getEnvironmentModule(),
        getFileProcessorModule(),
        getFileSystemModule(),
        getGetDateFuncFactoryModule(),
        getSettingsModule(settings),
    );

    return container;
}

function getSettingsModule(settings: Settings): AsyncContainerModule {
    return new AsyncContainerModule(async (bind: interfaces.Bind) => {
        bind<Settings>(SERVICES.Settings).toConstantValue(settings);
    });
}

function getDirectoryFactoryModule(): AsyncContainerModule {
    return new AsyncContainerModule(async (bind: interfaces.Bind) => {
        bind<IDirectoryFactory>(SERVICES.DirectoryFactory).toDynamicValue((ctx: interfaces.Context) => {
            const fs = ctx.container.get<IFileSystem>(SERVICES.FileSystem);
            const dirFactory = new DirectoryFactory(fs);

            return dirFactory;
        });
    });
}

function getFileSystemModule(): AsyncContainerModule {
    return new AsyncContainerModule(async (bind: interfaces.Bind) => {
        bind<IFileSystem>(SERVICES.FileSystem).toDynamicValue((ctx: interfaces.Context) => {
            const env = ctx.container.get<IEnvironment>(SERVICES.Environment);
            const fs = new FileSystemFactory(env)
                .create();

            return fs;
        });
    });
}

function getEnvironmentModule(): AsyncContainerModule {
    return new AsyncContainerModule(async (bind: interfaces.Bind) => {
        const env = new Environment();
        bind<IEnvironment>(SERVICES.Environment).toConstantValue(env);
    });
}

function getGetDateFuncFactoryModule(): AsyncContainerModule {
    return new AsyncContainerModule(async (bind: interfaces.Bind) => {
        const factory = new GetDateFuncFactory();
        bind<IGetDateFuncFactory>(SERVICES.GetDateFuncFactory).toConstantValue(factory);
    });
}

function getFileProcessorModule(): AsyncContainerModule {
    return new AsyncContainerModule(async (bind: interfaces.Bind) => {
        bind<IFileProcessor>(SERVICES.FileProcessor).toDynamicValue((ctx: interfaces.Context) => {
            const env = ctx.container.get<IEnvironment>(SERVICES.Environment);
            const settings = ctx.container.get<Settings>(SERVICES.Settings);
            const attrSelectorFactory = ctx.container.get<IGetDateFuncFactory>(SERVICES.GetDateFuncFactory);
    
            const fileProcessor = new FileProcessorFactory(env, settings, attrSelectorFactory)
                .create();
    
            return fileProcessor;
        });
    });
}
