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

// [START firestore_collection_list]
// [START firestore_data_get_all_documents]
// [START firestore_setup_dataset_read]
// [START firestore_quickstart]
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
  } catch (err: ExecutionException) {
    val message =
      when (val cause = err.cause) {
        is NotFoundException ->
          "error: Firestore database not found in project '$projectId': ${cause.message}"
        is ApiException ->
          "error: failed to retrieve collection '$collectionId' in project '$projectId': ${cause.message}"
        else ->
          "error: execution failed while querying collection '$collectionId' in project '$projectId': ${err.message}"
      }
    System.err.println(message)
  } catch (err: InterruptedException) {
    Thread.currentThread().interrupt()
    System.err.println(
      "error: interrupted while querying collection '$collectionId' in project '$projectId': ${err.message}"
    )
  }
}
// [END firestore_quickstart]
// [END firestore_setup_dataset_read]
// [END firestore_data_get_all_documents]
// [END firestore_collection_list]

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
