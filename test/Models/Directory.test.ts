import { expect } from 'chai';
import { It } from 'typemoq';

import { Directory } from '../../src/Models/Directory';
import { File } from '../../src/Models/File';
import { IFileSystem } from '../../src/Resources/IFileSystem';

import * as testHelpers from '../TestHelpers';

describe('Directory', () => {
    describe('subDirs', () =>
    {
        it('should return a collection of sub-directories', () => {
            // Setup
            const parentDir = testHelpers.generateUniquePath();
            const subDir = testHelpers.generateUniquePath();

            const mockFs = testHelpers.getMockedType<IFileSystem>(
                mock => {
                    mock.setup(fs => fs.getSubDirs(
                            It.isValue(parentDir)))
                        .returns(() => new Array<string>(subDir));
                });

            // Test
            const result = new Directory(
                    mockFs.object,
                    parentDir)
                .subDirs;

            // Validate
            expect(result).to.exist;
            expect(result).to.be.instanceOf(Array);
            expect(result).to.have.property('length', 1);

            const resultDir = result[0];
            expect(resultDir).to.be.instanceOf(Directory);
            expect(resultDir).to.have.property('path', subDir);
        });
    });

    describe('files', () =>
    {
        it('should return a collection of files', () => {
            // Setup
            const dirPath = testHelpers.generateUniquePath();
            const filePath = testHelpers.generateUniquePath();

            const mockFs = testHelpers.getMockedType<IFileSystem>(
                mock => {
                    mock.setup(fs => fs.getFiles(
                            It.isValue(dirPath)))
                        .returns(() => new Array<string>(filePath));
                });

            // Test
            const result = new Directory(
                    mockFs.object,
                    dirPath)
                .files;

            // Validate
            expect(result).to.exist;
            expect(result).to.be.instanceOf(Array);
            expect(result).to.have.property('length', 1);

            const resultDir = result[0];
            expect(resultDir).to.be.instanceOf(File);
            expect(resultDir).to.have.property('path', filePath);
        });
    });

    describe('delete()', () =>
    {
        it('should delete itself', () => {
            // Setup
            const dirPath = testHelpers.generateUniquePath();

            const mockFs = testHelpers.getMockedType<IFileSystem>(mock =>
                mock.setup(fs => fs.deleteDir(
                        It.isValue(dirPath)))
                    .verifiable());
                
            // Test
            new Directory(
                    mockFs.object,
                    dirPath)
                .delete();

            // Validate
            expect(mockFs.verifyAll())
                .not.Throw;
        });
    });

    describe('isEmpty', () => {
        const scenarios = [
            { hasSubDirs: true, hasFiles: true, expected: false },
            { hasSubDirs: true, hasFiles: false, expected: false },
            { hasSubDirs: false, hasFiles: true, expected: false },
            { hasSubDirs: false, hasFiles: false, expected: true }
        ];

        scenarios.forEach(scenario => {
            const expected = scenario.expected;
            const hasSubDirs = scenario.hasSubDirs;
            const hasFiles = scenario.hasFiles;

            it(`should be ${expected} { hasSubDirs = ${hasSubDirs}, hasFiles = ${hasFiles} }`, () => {
                // Setup
                const mockFs = testHelpers.getMockedType<IFileSystem>(mock => {
                    mock.setup(fs => fs.getSubDirs(
                            It.isAnyString()))
                        .returns(() => hasSubDirs
                            ? [ testHelpers.generateUniquePath() ]
                            : []);
                    mock.setup(fs => fs.getFiles(
                            It.isAnyString()))
                        .returns(() => hasFiles
                            ? [ testHelpers.generateUniquePath() ]
                            : []);
                });
    
                // Test
                const result = new Directory(
                        mockFs.object,
                        testHelpers.generateUniquePath())
                    .isEmpty;
    
                // Validate
                expect(result).to.equal(expected);
            });
        });
    });
});
