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

// [START storage_file_upload_from_memory]
import com.google.cloud.storage.BlobId
import com.google.cloud.storage.BlobInfo
import com.google.cloud.storage.StorageException
import com.google.cloud.storage.StorageOptions
import java.nio.charset.StandardCharsets

/**
 * Uploads an object payload with custom metadata to a Google Cloud Storage
 * bucket.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param bucketName Target Cloud Storage bucket name (for example, "example-bucket-name").
 * @param objectName Destination object name in the bucket (for example, "example-object.txt").
 */
fun uploadObject(projectId: String, bucketName: String, objectName: String) {
  val options =
    StorageOptions.newBuilder().setProjectId(projectId).build()
  val blobId = BlobId.of(bucketName, objectName)

  // Attach custom metadata before creating the object in Cloud Storage.
  val customMetadata =
    mapOf("environment" to "production", "source" to "example-kotlin-upload")
  val payloadBytes =
    "Example payload for Cloud Storage upload.".toByteArray(
      StandardCharsets.UTF_8
    )
  val blobInfo =
    BlobInfo.newBuilder(blobId)
      .setContentType("text/plain")
      .setMetadata(customMetadata)
      .build()

  try {
    options.service.use { storage ->
      val blob = storage.create(blobInfo, payloadBytes)

      println("Resource ID: ${blob.blobId.toGsUtilUri()}")
      println("Display Name: ${blob.name}")
      println("Creation Date: ${blob.createTimeOffsetDateTime}")
      println("Content Type: ${blob.contentType}")
      println("Generation: ${blob.generation}")
      println("Metadata: ${blob.metadata}")
    }
  } catch (err: StorageException) {
    if (err.code == 404) {
      System.err.println(
        "error: bucket '$bucketName' not found while uploading object '$objectName' in project '$projectId': ${err.message}"
      )
    } else {
      System.err.println(
        "error: failed to upload object '$objectName' to bucket '$bucketName' in project '$projectId': ${err.message}"
      )
    }
  }
}
// [END storage_file_upload_from_memory]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val bucketName =
    args.getOrNull(1)
      ?: System.getenv("BUCKET_NAME")
      ?: "example-bucket-name"
  val objectName =
    args.getOrNull(2)
      ?: System.getenv("OBJECT_NAME")
      ?: "example-object.txt"

  uploadObject(projectId, bucketName, objectName)
}
