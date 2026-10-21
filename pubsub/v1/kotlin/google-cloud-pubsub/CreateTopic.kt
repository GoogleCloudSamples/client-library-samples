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

// [START pubsub_v1_publisher_topic_create]
// [START pubsub_publisher_topic_create]
// [START pubsub_create_topic]
import com.google.api.gax.rpc.AlreadyExistsException
import com.google.api.gax.rpc.ApiException
import com.google.cloud.pubsub.v1.TopicAdminClient
import com.google.pubsub.v1.TopicName
import java.io.IOException

/**
 * Creates a Google Cloud Pub/Sub topic for publishing messages.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param topicId Identifier for the new Pub/Sub topic (for example, "example-topic-id").
 */
fun createTopic(projectId: String, topicId: String) {
  val topicName = TopicName.of(projectId, topicId)

  try {
    TopicAdminClient.create().use { topicAdminClient ->
      val response = topicAdminClient.createTopic(topicName)

      println("Resource ID: ${response.name}")
      println("Kms Key Name: ${response.kmsKeyName}")
      println("Labels: ${response.labelsMap}")
    }
  } catch (err: AlreadyExistsException) {
    System.err.println(
      "error: topic '$topicId' already exists in project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to create topic '$topicId' in project '$projectId': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize TopicAdminClient for topic '$topicId' in project '$projectId': ${err.message}"
    )
  }
}
// [END pubsub_create_topic]
// [END pubsub_publisher_topic_create]
// [END pubsub_v1_publisher_topic_create]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val topicId =
    args.getOrNull(1)
      ?: System.getenv("TOPIC_ID")
      ?: "example-topic-id"

  createTopic(projectId, topicId)
}
