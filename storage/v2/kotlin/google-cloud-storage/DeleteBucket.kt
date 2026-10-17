// [START storage_bucket_delete]
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
