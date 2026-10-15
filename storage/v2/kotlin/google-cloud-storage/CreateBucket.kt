// [START storage_bucket_create]
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
  val location = "US"

  // Configure standard storage class in the multi-region US location.
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
  } catch (err: Exception) {
    System.err.println(
      "error: failed to close or initialize Storage client for bucket '$bucketName' in project '$projectId': ${err.message}"
    )
  }
}
// [END storage_quickstart]
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
