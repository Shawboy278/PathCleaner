import { expect } from 'chai';

import { Directory } from '../../src/Models/Directory';
import { DirectoryFactory } from '../../src/Models/DirectoryFactory';

import * as testHelpers from '../TestHelpers';
import { IFileSystem } from '../../src/Resources/IFileSystem';

describe('DirectoryFactory', () => {
    describe('create()', () => {
        it('should create a Directory instance', () => {
            // Setup
            const path = testHelpers.generateUniquePath();
            const dirFactory = new DirectoryFactory(
                testHelpers.getType<IFileSystem>()
            );

            // Test
            const result = dirFactory.create(path);

            // Validate
            expect(result).to.exist;
            expect(result).to.be.instanceOf(Directory);
            expect(result).to.have.property('path').be.equal(path);
        });
    });
});
