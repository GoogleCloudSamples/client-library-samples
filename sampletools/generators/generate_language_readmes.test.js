// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for sampletools/generators/generate_language_readmes.js.
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {describe, it, beforeEach, afterEach} = require('node:test');

const gen = require('./generate_language_readmes');
const regionTags = require('../lib/region_tags');

describe('generate_language_readmes', () => {
  let repoRoot;
  const startMarker = '[START';

  beforeEach(() => {
    repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'lang-readmes-test-'));

    // Create a sample spec in vision/.samples/
    const samplesDir = path.join(repoRoot, 'vision', '.samples');
    fs.mkdirSync(samplesDir, {recursive: true});
    const specData = {
      version: '1.0.0',
      sampleId: 'vision_v1_imageannotator_batch_annotate_images',
      title: 'Annotate an image in Cloud Storage',
      description: 'Detects labels in an image stored in Cloud Storage.',
      extended: {
        service_version: 'v1',
      },
      regionTags: [
        {
          name: 'vision_v1_imageannotator_batch_annotate_images',
          title: 'Annotate an image in Cloud Storage',
        },
        {
          name: 'vision_quickstart',
        },
      ],
      instances: [
        null,
        undefined,
        {
          name: 'KOTLIN-google-cloud-vision',
          categories: {language: 'KOTLIN'},
        },
        {
          name: 'PYTHON-google-cloud-vision',
          categories: {language: 'PYTHON'},
        },
      ],
    };
    fs.writeFileSync(
      path.join(samplesDir, 'vision_v1_annotate.spec.json'),
      JSON.stringify(specData, null, 2),
      'utf8'
    );

    // Create Kotlin sample file (backed by spec) and build.gradle.kts
    const ktDir = path.join(
      repoRoot,
      'vision',
      'v1',
      'kotlin',
      'google-cloud-vision'
    );
    fs.mkdirSync(ktDir, {recursive: true});
    fs.writeFileSync(
      path.join(ktDir, 'build.gradle.kts'),
      '// Gradle build file\n',
      'utf8'
    );
    fs.writeFileSync(
      path.join(ktDir, 'AnnotateImage.kt'),
      `// ${startMarker} vision_v1_imageannotator_batch_annotate_images]\n` +
        'fun main() {}\n' +
        '// [END vision_v1_imageannotator_batch_annotate_images]\n',
      'utf8'
    );

    // Create Python sample file (using versionless tag to test fallback, without requirements.txt)
    const pyDir = path.join(
      repoRoot,
      'vision',
      'v1',
      'python',
      'google-cloud-vision'
    );
    fs.mkdirSync(pyDir, {recursive: true});
    fs.writeFileSync(
      path.join(pyDir, 'annotate_image.py'),
      `# ${startMarker} vision_imageannotator_batch_annotate_images]\n` +
        'def annotate(): pass\n' +
        '# [END vision_imageannotator_batch_annotate_images]\n',
      'utf8'
    );
  });

  afterEach(() => {
    fs.rmSync(repoRoot, {recursive: true, force: true});
  });

  it('indexes region tags and resolves spec-backed samples across languages', async () => {
    const {tagIndex, filesByLang} =
      await regionTags.buildGlobalTagIndex(repoRoot);
    const batchedResult = await regionTags.buildGlobalTagIndex(repoRoot, {
      concurrency: 1,
    });
    assert.deepEqual(batchedResult.tagIndex, tagIndex);
    assert.deepEqual(batchedResult.filesByLang, filesByLang);
    assert.equal(filesByLang.get('KOTLIN')?.length, 1);
    assert.equal(filesByLang.get('PYTHON')?.length, 1);

    const samplesByLang = await gen.collectCuratedSamples(repoRoot, {tagIndex});
    assert.equal(samplesByLang.get('KOTLIN')?.length, 1);
    assert.equal(samplesByLang.get('PYTHON')?.length, 1);

    const ktSample = samplesByLang.get('KOTLIN')[0];
    assert.equal(ktSample.product, 'vision');
    assert.equal(ktSample.version, 'v1');
    assert.equal(ktSample.libraryName, 'google-cloud-vision');
    assert.equal(
      ktSample.primaryTag,
      'vision_v1_imageannotator_batch_annotate_images'
    );
    assert.equal(ktSample.hasDepFile, true);
    assert.equal(
      ktSample.fileRelPath,
      'vision/v1/kotlin/google-cloud-vision/AnnotateImage.kt'
    );

    const pySample = samplesByLang.get('PYTHON')[0];
    assert.equal(
      pySample.primaryTag,
      'vision_imageannotator_batch_annotate_images'
    );
    assert.equal(pySample.hasDepFile, false);
  });

  it('generates language READMEs and validates --check mode', async () => {
    const outputDir = path.join(repoRoot, 'docs');
    const {processedPaths, outOfDatePaths} = await gen.generateLanguageReadmes({
      repoRoot,
      outputDir,
      checkOnly: false,
    });
    assert.equal(processedPaths.length, 2);
    assert.equal(outOfDatePaths.length, 0);

    const kotlinMdPath = path.join(outputDir, 'KOTLIN.md');
    const pythonMdPath = path.join(outputDir, 'PYTHON.md');
    assert.equal(fs.existsSync(kotlinMdPath), true);
    assert.equal(fs.existsSync(pythonMdPath), true);

    const ktContent = fs.readFileSync(kotlinMdPath, 'utf8');
    assert.match(ktContent, /# Google Cloud API Samples for Kotlin/);
    assert.match(ktContent, /## Prerequisites/);
    assert.match(ktContent, /## Search Shortcut: All Kotlin Samples/);
    assert.match(ktContent, /path%3A%2A%2A%2Fkotlin%2F%2A%2A/);
    assert.match(ktContent, /## Curated List of Available Samples/);
    assert.match(ktContent, /### Cloud Vision \(v1\)/);
    assert.match(ktContent, /`build\.gradle\.kts`/);
    assert.ok(
      ktContent.includes(
        '[**Annotate an image in Cloud Storage**](../vision/v1/kotlin/google-cloud-vision/AnnotateImage.kt)'
      )
    );

    const pyContent = fs.readFileSync(pythonMdPath, 'utf8');
    assert.ok(pyContent.includes('**Python 3.12 or higher**'));
    assert.ok(
      !pyContent.includes(
        '(../vision/v1/python/google-cloud-vision/requirements.txt)'
      )
    );
    assert.ok(!pyContent.includes('Region Tag'));

    // Check mode passes when files are up to date
    const checkClean = await gen.generateLanguageReadmes({
      repoRoot,
      outputDir,
      checkOnly: true,
    });
    assert.deepEqual(checkClean.outOfDatePaths, []);

    // Check mode detects modified files
    fs.appendFileSync(kotlinMdPath, '\n<!-- stale -->\n', 'utf8');
    const checkStale = await gen.generateLanguageReadmes({
      repoRoot,
      outputDir,
      checkOnly: true,
    });
    assert.deepEqual(checkStale.outOfDatePaths, [kotlinMdPath]);
  });

  it('supports language filtering, aliases, and markdown formatting helpers', async () => {
    assert.equal(
      gen.escapeMdTableCell('Line 1\nLine 2 | Pipe'),
      'Line 1 Line 2 \\| Pipe'
    );
    assert.equal(
      gen.headingToAnchor('Search Shortcut: All JavaScript Samples'),
      'search-shortcut-all-javascript-samples'
    );
    assert.equal(gen.normalizeLanguageKey('javascript'), 'NODEJS');
    assert.equal(
      gen.getLanguageMetadata('NODEJS').output_filename,
      'JAVASCRIPT.md'
    );

    const outputDir = 'docs_filtered';
    const {processedPaths} = await gen.generateLanguageReadmes({
      repoRoot,
      outputDir,
      languages: ['kotlin'],
      checkOnly: false,
    });
    assert.deepEqual(processedPaths, [
      path.join(repoRoot, 'docs_filtered', 'KOTLIN.md'),
    ]);

    // Validates that an invalid repoRoot throws an error
    await assert.rejects(
      () =>
        gen.generateLanguageReadmes({
          repoRoot: path.join(repoRoot, 'does-not-exist'),
        }),
      /Repository root does not exist or is not a directory/
    );
  });

  it('gracefully logs and skips malformed specs and unreadable source files', async () => {
    const warnings = [];
    const testLogger = {
      info: () => {},
      warn: msg => warnings.push(msg),
      error: () => {},
    };

    // 1. Malformed JSON spec should log a warning and be skipped
    const badSpecPath = path.join(
      repoRoot,
      'vision',
      '.samples',
      'malformed.spec.json'
    );
    fs.writeFileSync(badSpecPath, '{ invalid json ', 'utf8');

    const samplesByLang = await gen.collectCuratedSamples(repoRoot, {
      logger: testLogger,
    });
    assert.ok(warnings.some(msg => msg.includes('Skipping invalid spec')));
    assert.equal(samplesByLang.get('KOTLIN')?.length, 1);

    // 2. Unreadable source file raising an error during streaming should log a warning
    warnings.length = 0;
    const unreadableTarget = path.resolve(
      repoRoot,
      'vision',
      'v1',
      'python',
      'google-cloud-vision',
      'annotate_image.py'
    );

    const faultyCreateReadStream = (filePath, options) => {
      if (path.resolve(filePath) === unreadableTarget) {
        throw new Error('Simulated permission denied');
      }
      return fs.createReadStream(filePath, options);
    };

    const {filesByLang} = await regionTags.buildGlobalTagIndex(repoRoot, {
      logger: testLogger,
      createReadStream: faultyCreateReadStream,
    });
    assert.ok(warnings.some(msg => msg.includes('Could not read')));
    assert.equal(filesByLang.get('KOTLIN')?.length, 1);
    assert.equal(filesByLang.has('PYTHON'), false);
  });

  it('handles version extraction and versionless tag derivation edge cases', () => {
    assert.equal(
      regionTags.extractVersionFromTagOrId(
        'vision_v1_imageannotator_batch_annotate_images'
      ),
      'v1'
    );
    assert.equal(
      regionTags.extractVersionFromTagOrId(
        'bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create'
      ),
      'v2beta1'
    );
    assert.equal(
      regionTags.extractVersionFromTagOrId(
        'speech_v1p1beta1_adaptation_customclass_create'
      ),
      'v1p1beta1'
    );
    assert.equal(
      regionTags.extractVersionFromTagOrId(
        'bigquerymigration_v2alpha_migrationservice_migrationworkflow_create'
      ),
      'v2alpha'
    );
    assert.equal(
      regionTags.extractVersionFromTagOrId('vision_quickstart'),
      null
    );
    assert.equal(
      regionTags.extractVersionFromTagOrId('pubsub_message_publish'),
      null
    );
    assert.equal(regionTags.extractVersionFromTagOrId('product_v1'), null);

    assert.equal(
      regionTags.deriveVersionlessTag(
        'vision_v1_imageannotator_batch_annotate_images'
      ),
      'vision_imageannotator_batch_annotate_images'
    );
    assert.equal(
      regionTags.deriveVersionlessTag(
        'speech_v1p1beta1_adaptation_customclass_create'
      ),
      'speech_adaptation_customclass_create'
    );
    assert.equal(regionTags.deriveVersionlessTag('vision_quickstart'), null);
    assert.equal(regionTags.deriveVersionlessTag('product_v1'), null);
  });
});
