/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START storage_bucket_get]
import com.google.cloud.storage.StorageException
import com.google.cloud.storage.StorageOptions

/**
 * Retrieves metadata for an existing Google Cloud Storage bucket.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param bucketName Target Cloud Storage bucket name (for example, "example-bucket-name").
 */
fun getBucketMetadata(projectId: String, bucketName: String) {
  val options =
    StorageOptions.newBuilder().setProjectId(projectId).build()

  try {
    options.service.use { storage ->
      val bucket = storage.get(bucketName)
      if (bucket == null) {
        System.err.println(
          "error: bucket '$bucketName' not found in project '$projectId'"
        )
      } else {
        println("Resource ID: ${bucket.generatedId}")
        println("Display Name: ${bucket.name}")
        println("Creation Date: ${bucket.createTimeOffsetDateTime}")
        println("Location: ${bucket.location}")
        println("Metageneration: ${bucket.metageneration}")
        println("Storage Class: ${bucket.storageClass}")
      }
    }
  } catch (err: StorageException) {
    System.err.println(
      "error: failed to retrieve metadata for bucket '$bucketName' in project '$projectId': ${err.message}"
    )
  }
}
// [END storage_bucket_get]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val bucketName =
    args.getOrNull(1)
      ?: System.getenv("BUCKET_NAME")
      ?: "example-bucket-name"

  getBucketMetadata(projectId, bucketName)
}
