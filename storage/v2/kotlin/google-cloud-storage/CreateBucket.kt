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

// [START storage_bucket_create]
// [START storage_create_bucket]
// [START storage_quickstart]
import com.google.cloud.storage.BucketInfo
import com.google.cloud.storage.StorageClass
import com.google.cloud.storage.StorageException
import com.google.cloud.storage.StorageOptions

/**
 * Creates a Google Cloud Storage bucket configured with standard storage class.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param bucketName Globally unique Cloud Storage bucket name (for example, "example-bucket-name").
 */
fun createBucket(projectId: String, bucketName: String) {
  val options =
    StorageOptions.newBuilder().setProjectId(projectId).build()
  // The US multi-region and Standard storage class match the Cloud Storage Quickstart defaults.
  val location = "US"

  val bucketInfo =
    BucketInfo.newBuilder(bucketName)
      .setLocation(location)
      .setStorageClass(StorageClass.STANDARD)
      .build()

  try {
    options.service.use { storage ->
      val bucket = storage.create(bucketInfo)

      println("Resource ID: ${bucket.generatedId}")
      println("Display Name: ${bucket.name}")
      println("Creation Date: ${bucket.createTimeOffsetDateTime}")
      println("Location: ${bucket.location}")
      println("Storage Class: ${bucket.storageClass}")
    }
  } catch (err: StorageException) {
    if (err.code == 409) {
      System.err.println(
        "error: bucket '$bucketName' already exists in project '$projectId': ${err.message}"
      )
    } else {
      System.err.println(
        "error: failed to create bucket '$bucketName' in project '$projectId': ${err.message}"
      )
    }
  }
}
// [END storage_quickstart]
// [END storage_create_bucket]
// [END storage_bucket_create]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val bucketName =
    args.getOrNull(1)
      ?: System.getenv("BUCKET_NAME")
      ?: "example-bucket-name"

  createBucket(projectId, bucketName)
}
