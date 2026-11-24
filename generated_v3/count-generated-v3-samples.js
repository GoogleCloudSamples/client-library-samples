// Counts generated samples and prints a JSON summary (total, per-language, and service count).
// Run from the repo root:
//   node generated_v3/count-generated-v3-samples.js
// Or pass a custom directory:
//   node generated_v3/count-generated-v3-samples.js path/to/generated_v3

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Lists all sample directory paths under `rootDir`.
 *
 * @param {string} rootDir Path to the generated_v3 directory.
 * @return {Set<string>} Set of sample directory paths relative to rootDir.
 */
function getSampleDirsSet(rootDir) {
  const sampleDirsSet = new Set();

  for (const file of fs.readdirSync(rootDir, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!file.isFile()) {
      continue;
    }

    const folderPath = path.relative(rootDir, file.parentPath);
    // Example path: secretmanager/v1beta1/python/google-cloud-secrets/secret_manager_service/create_secret
    const numSlashes = folderPath.split(path.sep).length - 1;
    if (numSlashes === 5) {
      sampleDirsSet.add(folderPath);
    } else {
      console.warn(
        `Ignoring path (with ${numSlashes} slashes): ${path.join(folderPath, file.name)}`
      );
    }
  }

  return sampleDirsSet;
}

/**
 * Counts samples under the given root directory, grouped by language and
 * service.
 *
 * @param {string} rootDir Path to the generated_v3 directory.
 * @return {{total: number, languageToNumOfSamples: Object<string, number>, numOfServices: number}}
 */
function countSamples(rootDir) {
  const sampleDirsSet = getSampleDirsSet(rootDir);
  const languageToNumOfSamples = {};
  const servicesSet = new Set();

  // Assume each sample directory contains exactly 1 sample.
  for (const dirPath of sampleDirsSet) {
    const parts = dirPath.split(path.sep);
    const service = parts[0];
    const language = parts[2];
    servicesSet.add(service);
    languageToNumOfSamples[language] = (languageToNumOfSamples[language] || 0) + 1;
  }

  return {
    total: sampleDirsSet.size,
    languageToNumOfSamples,
    numOfServices: servicesSet.size,
  };
}

function main() {
  const targetArg = process.argv[2];
  const targetDir = targetArg ? path.resolve(targetArg) : __dirname;

  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    process.exitCode = 1;
    return;
  }

  const result = countSamples(targetDir);
  console.log(JSON.stringify(result, null, 2));
}

main();
