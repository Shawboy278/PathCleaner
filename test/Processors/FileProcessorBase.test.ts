import { expect } from 'chai';
import { IMock, Times } from 'typemoq';

import { FileProcessorBase } from '../../src/Processors/FileProcessorBase';

import * as testHelpers from '../TestHelpers';
import { TestError } from '../TestError';
import { IDirectory } from '../../src/Models/IDirectory';
import { IFile } from '../../src/Models/IFile';

describe('FileProcessorBase', () => {
    describe('process()', () => {
        it('should recurse through its sub-dirs', () => {
            // Setup
            const allowRootEmptyDelete = false;

            const mockSubDir = createMockedDir();
            const mockDir = createMockedDir(
                [ mockSubDir.object ],
                undefined,
                allowRootEmptyDelete);

            // Test
            new TestFileProcessor().process(
                mockDir.object,
                allowRootEmptyDelete);

            // Validate
            expect(mockSubDir.verifyAll()).does.not.throw;
            expect(mockDir.verifyAll()).does.not.throw;
        });

        [false, true].forEach(isExpired => {
            it(`should iterate through its files and deleted expired ones { isExpired = ${isExpired} }`, () => {
                // Setup
                const mockFile = testHelpers.getMockedType<IFile>(mock =>{
                    mock.setup(file => file.path)
                        .returns(() => testHelpers.generateUniquePath());
                    mock.setup(file => file.delete())
                        .verifiable(isExpired ? Times.once() : Times.never());
                });

                const dir = createMockedDir(
                        undefined,
                        [ mockFile.object ])
                    .object;

                // Test
                new TestFileProcessor(isExpired)
                    .process(dir);

                // Validate
                // TODO: Rewrite so to take advantage of mockFile.verifyAll
                const mockFileDeletionVerifyFunc = () => mockFile.verify(
                    file => file.delete(),
                    isExpired ? Times.once() : Times.never());
                expect(mockFileDeletionVerifyFunc()).does.not.throw;
            });
        });

        [false, true].forEach(allowEmptyDelete => {
            it(`should delete empty dir { allowEmptyDelete = ${allowEmptyDelete} }`, () => {
                // Setup
                const mockRootDir = createMockedDir(
                    undefined,
                    undefined,
                    allowEmptyDelete);

                // Test
                new TestFileProcessor()
                    .process(
                        mockRootDir.object,
                        allowEmptyDelete);

                // Validate
               expect(mockRootDir.verifyAll()).does.not.throw;
            });
        });
    });
});

class TestFileProcessor extends FileProcessorBase {
    private readonly _isExpired: boolean | undefined;

    constructor(isExpired?: boolean) {
        super();

        this._isExpired = isExpired;
    }

    public isExpired(_: IFile): boolean {
        if (this._isExpired == undefined) {
            throw new TestError('Should never be reached');
        }

        return this._isExpired;
    }
}

function createMockedDir(
    subDirs: IDirectory[] = new Array<IDirectory>(),
    files: IFile[] = new Array<IFile>(),
    allowEmptyDelete: boolean = true
): IMock<IDirectory> {
    return testHelpers.getMockedType<IDirectory>(mock => {
        const path = testHelpers.generateUniquePath();
        mock.setup(dir => dir.path)
            .returns(() => path)
            .verifiable(Times.atLeastOnce());

        mock.setup(dir => dir.subDirs)
            .returns(() => subDirs)
            .verifiable();

        mock.setup(dir => dir.files)
            .returns(() => files)
            .verifiable();

        const isEmpty = subDirs.length == 0 && files.length == 0;
        mock.setup(dir => dir.isEmpty)
            .returns(() => isEmpty)
            .verifiable(allowEmptyDelete ? Times.once() : Times.never());

        mock.setup(dir => dir.delete())
            .verifiable(allowEmptyDelete && isEmpty
                ? Times.once()
                : Times.never());
    });
}
