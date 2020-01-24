import { expect } from 'chai';

import { FileSystemObjectBase } from '../../src/Models/FileSystemObjectBase';
import { IFileSystem } from '../../src/Resources/IFileSystem';

import * as testHelpers from '../TestHelpers';
import { TestError } from '../TestError';

describe('FileSystemObjectBase', () => {
    describe('path', () => {
        it('should return its path', () => {
            // Setup
            const expected = testHelpers.generateUniquePath();

            // Test
            const actual = new TestFileSystemObject(
                    testHelpers.getType<IFileSystem>(),
                    expected)
                .path;
            
            testHelpers.getMockedType<FileSystemObjectBase>(mock =>
                mock.setup(fsObject => fsObject.path)
                    .callBase)
                .object;

            // Validate
            expect(actual).to.exist;
            expect(actual).to.equal(expected);
        });
    });
});

class TestFileSystemObject extends FileSystemObjectBase {
    constructor(
        fs: IFileSystem,
        path: string
    ) {
        super(fs, path);
    }

    public delete(): void {
        throw new TestError("This should never be reached");
    }
}
