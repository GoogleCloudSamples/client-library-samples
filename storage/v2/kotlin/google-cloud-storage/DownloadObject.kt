// [START storage_download_object]
import com.google.cloud.storage.BlobId
import com.google.cloud.storage.StorageException
import com.google.cloud.storage.StorageOptions
import java.nio.charset.StandardCharsets

/**
 * Downloads an object's bytes and metadata from a Google Cloud Storage bucket.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param bucketName Source Cloud Storage bucket name (for example, "example-bucket-name").
 * @param objectName Source object name in the bucket (for example, "example-object.txt").
 */
fun downloadObject(projectId: String, bucketName: String, objectName: String) {
  val options =
    StorageOptions.newBuilder().setProjectId(projectId).build()
  val blobId = BlobId.of(bucketName, objectName)

  try {
    options.service.use { storage ->
      val blob = storage.get(blobId)
      if (blob == null) {
        System.err.println(
          "error: object '$objectName' not found in bucket '$bucketName' for project '$projectId'"
        )
      } else {
        val content = String(blob.getContent(), StandardCharsets.UTF_8)
        println("Resource ID: ${blob.blobId.toGsUtilUri()}")
        println("Display Name: ${blob.name}")
        println("Creation Date: ${blob.createTimeOffsetDateTime}")
        println("Content Length: ${content.length}")
        println("Content Type: ${blob.contentType}")
        println("Generation: ${blob.generation}")
      }
    }
  } catch (err: StorageException) {
    if (err.code == 404) {
      System.err.println(
        "error: object '$objectName' or bucket '$bucketName' not found in project '$projectId': ${err.message}"
      )
    } else {
      System.err.println(
        "error: failed to download object '$objectName' from bucket '$bucketName' in project '$projectId': ${err.message}"
      )
    }
  } catch (err: Exception) {
    System.err.println(
      "error: failed to close or initialize Storage client for object '$objectName' in bucket '$bucketName' for project '$projectId': ${err.message}"
    )
  }
}
// [END storage_download_object]

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

  downloadObject(projectId, bucketName, objectName)
}
