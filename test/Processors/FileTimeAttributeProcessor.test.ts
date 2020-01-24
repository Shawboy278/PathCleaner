import { expect } from 'chai';

import { FileTimeAttributeProcessor } from '../../src/Processors/FileTimeAttributeProcessor';
import { Constants } from '../../src/Processors/FileProcessorCommon';

import * as testHelpers from '../TestHelpers';
import { IFile } from '../../src/Models/IFile';

describe('FileTimeAttributeProcessor', () => {
    describe('isExpired()', () => {
        [false, true].forEach(isExpired => {
            it(`should indicate the expiration based on when last modified { isExpired = ${isExpired} }`, () => {
                // Setup
                const now = Date.now();

                const age = 1;
                const refDate = new Date(now);
                const mockFile = testHelpers.getMockedType<IFile>(mock =>
                    mock.setup(file => file.lastModifiedTime)
                        .returns(() => new Date(now - Constants.SingleDayMs + (isExpired ? -1 : 1)))
                        .verifiable());

                // Test
                const result = new FileTimeAttributeProcessor(
                        age,
                        refDate,
                        (file: IFile) => file.lastModifiedTime)
                    .isExpired(mockFile.object);

                // Validate
                expect(mockFile.verifyAll()).does.not.throw;
                expect(result).equals(isExpired);
            });
        });
    });
});
