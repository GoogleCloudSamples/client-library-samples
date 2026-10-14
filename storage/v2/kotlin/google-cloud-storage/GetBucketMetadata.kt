// [START storage_get_bucket_metadata]
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
    if (err.code == 404) {
      System.err.println(
        "error: bucket '$bucketName' not found in project '$projectId': ${err.message}"
      )
    } else {
      System.err.println(
        "error: failed to retrieve metadata for bucket '$bucketName' in project '$projectId': ${err.message}"
      )
    }
  } catch (err: Exception) {
    System.err.println(
      "error: failed to close or initialize Storage client for bucket '$bucketName' in project '$projectId': ${err.message}"
    )
  }
}
// [END storage_get_bucket_metadata]

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
