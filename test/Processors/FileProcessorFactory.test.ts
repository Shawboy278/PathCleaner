import { expect } from 'chai';
import { It } from 'typemoq';

import { Settings } from '../../src/Configuration/Settings';
import { FileProcessorFactory } from '../../src/Processors/FileProcessorFactory';
import { FileProcessorTypes } from '../../src/Processors/FileProcessorTypes';
import { FileTimeAttributeProcessor } from '../../src/Processors/FileTimeAttributeProcessor';
import { IGetDateFuncFactory } from '../../src/Processors/IGetDateFuncFactory';
import { Environment } from '../../src/Resources/Environment';

import * as testHelpers from '../TestHelpers';

describe('FileProcessorFactory', () => {
    describe('create()', () => {
        testHelpers.getFileProcessorTypes().forEach(processorType => {
            it(`should return a processor using ${FileProcessorTypes[processorType]}`, () => {
                // Setup
                const expectedProcessorType = typeMapping.get(processorType);
                expect(expectedProcessorType).is.not.undefined;

                const settings = new Settings(
                    testHelpers.generateUniquePath(),
                    0,
                    processorType);

                const getDateFuncFactory = testHelpers.getType<IGetDateFuncFactory>(mock =>
                    mock.setup(factory => factory.create(It.isAnyNumber()))
                        .returns(() => (_ => testHelpers.now())));

                // Test
                const actualProcessorType = new FileProcessorFactory(
                        new Environment(),
                        settings,
                        getDateFuncFactory)
                    .create();

                // Validate
                expect(actualProcessorType).does.exist;
                expect(actualProcessorType).is.instanceOf(expectedProcessorType);
            });
        });
    });
});

const typeMapping = new Map<FileProcessorTypes, any>([
    [ FileProcessorTypes.LastModifiedTime, FileTimeAttributeProcessor ]
]);
