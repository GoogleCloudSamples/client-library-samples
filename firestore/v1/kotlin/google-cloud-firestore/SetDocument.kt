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

// [START firestore_document_set]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
import com.google.cloud.firestore.FirestoreOptions
import java.util.concurrent.ExecutionException

/**
 * Writes a document with structured fields into a Firestore collection. Setting
 * a document creates the record if it does not exist or overwrites its fields.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param collectionId Target Firestore collection identifier (for example, "example-collection").
 * @param documentId Target Firestore document identifier (for example, "example-document").
 */
fun setDocument(projectId: String, collectionId: String, documentId: String) {
  val options =
    FirestoreOptions.getDefaultInstance()
      .toBuilder()
      .setProjectId(projectId)
      .build()

  val documentData =
    mapOf(
      "category" to "example-category",
      "environment" to "production",
      "version" to 1,
    )

  try {
    options.service.use { firestore ->
      val documentReference =
        firestore.collection(collectionId).document(documentId)
      println("Writing document '$documentId' in collection '$collectionId'...")
      val writeResult = documentReference.set(documentData).get()

      println("Resource ID: ${documentReference.path}")
      println("Collection ID: $collectionId")
      println("Document ID: $documentId")
      println("Update Time: ${writeResult.updateTime}")
    }
  } catch (err: ExecutionException) {
    val message =
      when (val cause = err.cause) {
        is NotFoundException ->
          "error: Firestore database not found in project '$projectId': ${cause.message}"
        is ApiException ->
          "error: failed to write document '$documentId' in collection '$collectionId' for project '$projectId': ${cause.message}"
        else ->
          "error: execution failed while writing document '$documentId' in collection '$collectionId' for project '$projectId': ${err.message}"
      }
    System.err.println(message)
  } catch (err: InterruptedException) {
    Thread.currentThread().interrupt()
    System.err.println(
      "error: interrupted while writing document '$documentId' in collection '$collectionId' for project '$projectId': ${err.message}"
    )
  }
}
// [END firestore_document_set]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val collectionId =
    args.getOrNull(1)
      ?: System.getenv("COLLECTION_ID")
      ?: "example-collection"
  val documentId =
    args.getOrNull(2)
      ?: System.getenv("DOCUMENT_ID")
      ?: "example-document"

  setDocument(projectId, collectionId, documentId)
}
