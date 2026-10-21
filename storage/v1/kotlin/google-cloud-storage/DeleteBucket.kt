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

// [START storage_bucket_delete]
// [START storage_delete_bucket]
import com.google.cloud.storage.StorageException
import com.google.cloud.storage.StorageOptions

/**
 * Deletes an empty Google Cloud Storage bucket.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param bucketName Cloud Storage bucket name to delete (for example, "example-bucket-name").
 */
fun deleteBucket(projectId: String, bucketName: String) {
  val options =
    StorageOptions.newBuilder().setProjectId(projectId).build()

  try {
    options.service.use { storage ->
      val deleted = storage.delete(bucketName)
      if (!deleted) {
        System.err.println(
          "error: bucket '$bucketName' not found in project '$projectId'"
        )
      } else {
        println("Resource ID: gs://$bucketName")
        println("Display Name: $bucketName")
        println("Deleted: $deleted")
        println("Project ID: $projectId")
      }
    }
  } catch (err: StorageException) {
    System.err.println(
      "error: failed to delete bucket '$bucketName' in project '$projectId': ${err.message}"
    )
  }
}
// [END storage_delete_bucket]
// [END storage_bucket_delete]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val bucketName =
    args.getOrNull(1)
      ?: System.getenv("BUCKET_NAME")
      ?: "example-bucket-name"

  deleteBucket(projectId, bucketName)
}
