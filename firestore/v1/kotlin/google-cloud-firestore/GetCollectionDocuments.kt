// [START firestore_get_collection_documents]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
import com.google.cloud.firestore.FirestoreOptions
import java.util.concurrent.ExecutionException

/**
 * Retrieves all documents from a Firestore collection and prints their metadata
 * and fields.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param collectionId Firestore collection identifier to query (for example, "example-collection").
 */
fun getCollectionDocuments(projectId: String, collectionId: String) {
  val options =
    FirestoreOptions.getDefaultInstance()
      .toBuilder()
      .setProjectId(projectId)
      .build()

  try {
    options.service.use { firestore ->
      val collectionReference = firestore.collection(collectionId)
      println("Retrieving documents from collection '$collectionId'...")
      val querySnapshot = collectionReference.get().get()

      println("Resource ID: ${collectionReference.path}")
      println("Document Count: ${querySnapshot.documents.size}")
      println("Read Time: ${querySnapshot.readTime}")
      for (document in querySnapshot.documents) {
        println("Document ID: ${document.id}")
        println("Creation Date: ${document.createTime}")
        println("Data: ${document.data}")
        println("Update Time: ${document.updateTime}")
      }
    }
  } catch (err: NotFoundException) {
    System.err.println(
      "error: collection '$collectionId' not found in project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to retrieve collection '$collectionId' in project '$projectId': ${err.message}"
    )
  } catch (err: ExecutionException) {
    System.err.println(
      "error: execution failed while querying collection '$collectionId' in project '$projectId': ${err.message}"
    )
  } catch (err: InterruptedException) {
    Thread.currentThread().interrupt()
    System.err.println(
      "error: interrupted while querying collection '$collectionId' in project '$projectId': ${err.message}"
    )
  } catch (err: Exception) {
    System.err.println(
      "error: failed to initialize or close Firestore client for collection '$collectionId' in project '$projectId': ${err.message}"
    )
  }
}
// [END firestore_get_collection_documents]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val collectionId =
    args.getOrNull(1)
      ?: System.getenv("COLLECTION_ID")
      ?: "example-collection"

  getCollectionDocuments(projectId, collectionId)
}
