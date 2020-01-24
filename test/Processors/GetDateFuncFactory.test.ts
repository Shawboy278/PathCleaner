import { expect } from 'chai';
import { Times } from 'typemoq';

import { IFile } from '../../src/Models/IFile';
import { FileProcessorTypes } from '../../src/Processors/FileProcessorTypes';
import { GetDateFuncFactory } from '../../src/Processors/GetDateFuncFactory';

import * as testHelpers from '../TestHelpers';

describe('GetDateFuncFactory', () => {
    describe('create()', () => {
        testHelpers.getFileProcessorTypes().forEach(processorType => {
            it(`should return a func for ${FileProcessorTypes[processorType]}`, () => {
                // Setup
                const factory = new GetDateFuncFactory();

                // Test
                const result = factory.create(processorType);

                // Validate
                expect(result).does.exist;
            });
        });

        testHelpers.getFileProcessorTypes().forEach(processorType => {
            it(`should use the ${FileProcessorTypes[processorType]} attribute`, () => {
                // Setup
                const getDateFunc = new GetDateFuncFactory()
                    .create(processorType);

                const mockFile = testHelpers.getMockedType<IFile>(mock =>
                    mock.setup(file => file.lastModifiedTime)
                        .returns(() => testHelpers.now())
                        .verifiable(processorType == FileProcessorTypes.LastModifiedTime
                            ? Times.once()
                            : Times.never()));

                // Test
                getDateFunc(mockFile.object);

                // Validate
                expect(mockFile.verifyAll()).does.not.throw;
            });
        });
    });
});
