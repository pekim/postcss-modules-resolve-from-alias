import assert from 'assert';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

import processor from '../src';

const options = {
  'css-one-level'                 : 'dest-one-level',
  'css/two-levels'                : 'dest-two-levels',
  'css/two-levels-trailing-slash/': 'dest-two-levels-trailing-slash'
};

const pipeline = postcss([processor(options)]);
const testDir = path.join(__dirname, 'test-cases');

function readFile(filename, type) {
  return fs.readFileSync(path.join(testDir, filename, type), 'utf-8');
}

describe('test-cases', () => {
  fs.readdirSync(testDir).forEach(testCaseFile => {
    if(fs.existsSync(path.join(testDir, testCaseFile, 'source.css'))) {
      const testCaseName = testCaseFile.replace(/-/g, ' ');

      it('should ' + testCaseName, () => {
        const source = readFile(testCaseFile, 'source.css');
        const expected = readFile(testCaseFile, 'expected.css');

        assert.equal(pipeline.process(source).css, expected);
      });
    }
  });
});
