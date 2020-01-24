import { expect } from 'chai';
import { It } from 'typemoq';

import { File } from '../../src/Models/File';
import { IFileSystem } from '../../src/Resources/IFileSystem';

import * as testHelpers from '../TestHelpers';

describe('File', () => {
    describe('lastModifiedTime', () => {
        it('should return its last modified time', () => {
            // Setup
            const filePath = testHelpers.generateUniquePath();
            const fileTime = new Date();
    
            const mockFs = testHelpers.getMockedType<IFileSystem>(mock =>
                mock.setup(fs => fs.getLastModifiedTime(
                        It.isValue(filePath)))
                    .returns(() => fileTime));
            
            // Test
            const result = new File(
                    mockFs.object,
                    filePath)
                .lastModifiedTime;
    
            // Validate
            expect(result).to.exist;
            expect(result).to.equal(fileTime);
        });
    });

    describe('delete()', () => {
        it('should delete itself', () => {
            // Setup
            const filePath = testHelpers.generateUniquePath();

            const mockFs = testHelpers.getMockedType<IFileSystem>(mock =>
                mock.setup(fs => fs.deleteFile(
                    It.isValue(filePath)))
                .verifiable());
                
            // Test
            new File(
                    mockFs.object,
                    filePath)
                .delete();

            // Validate
            expect(mockFs.verifyAll()).does.not.throw;
        });
    });
});