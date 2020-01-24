import * as tmp from 'tmp';
import { IMock, Mock, MockBehavior } from 'typemoq';

import { FileProcessorTypes } from '../src/Processors/FileProcessorTypes';

export function generateUniquePath() : string {
    return tmp.tmpNameSync();
}

export function getMockedType<TMockedType>(
    setupFunc? : (mock: IMock<TMockedType>) => void
): IMock<TMockedType> {
    const mock = Mock.ofType<TMockedType>(
        undefined,
        MockBehavior.Strict);
    
    if (setupFunc) {
        setupFunc(mock);
    }

    return mock;
}

export function getType<TMockedType>(
    setupFunc? : (mock: IMock<TMockedType>) => void
): TMockedType {
    return getMockedType<TMockedType>(setupFunc)
        .object;
}

export function now() {
    return new Date(Date.now());
}

export function getFileProcessorTypes(): FileProcessorTypes[] {
    const types = new Array<FileProcessorTypes>();

    for (let type in FileProcessorTypes) {
        if (isNaN(Number(type))) {
            const enumKey = type as keyof typeof FileProcessorTypes;
            types.push(FileProcessorTypes[enumKey]);
        }
    }

    return types;
}
