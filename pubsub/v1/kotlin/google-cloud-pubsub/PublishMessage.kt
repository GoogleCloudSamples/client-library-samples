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

// [START pubsub_message_publish]
// [START pubsub_publish_custom_attributes]
// [START pubsub_quickstart_publisher]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
import com.google.cloud.pubsub.v1.Publisher
import com.google.protobuf.ByteString
import com.google.pubsub.v1.PubsubMessage
import com.google.pubsub.v1.TopicName
import java.io.IOException
import java.util.concurrent.ExecutionException
import java.util.concurrent.TimeUnit

/**
 * Publishes a UTF-8 message payload with custom attributes to a Pub/Sub topic.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param topicId Target Pub/Sub topic identifier (for example, "example-topic-id").
 */
fun publishMessage(projectId: String, topicId: String) {
  val topicName = TopicName.of(projectId, topicId)
  val payloadText = "Example Pub/Sub message payload"
  val messageData = ByteString.copyFromUtf8(payloadText)
  val messageAttributes =
    mapOf("environment" to "production", "origin" to "example-kotlin-publisher")
  val pubsubMessage =
    PubsubMessage.newBuilder()
      .setData(messageData)
      .putAllAttributes(messageAttributes)
      .build()

  var publisher: Publisher? = null
  try {
    publisher = Publisher.newBuilder(topicName).build()
    println("Publishing message to topic '${topicName}'...")
    val messageIdFuture = publisher.publish(pubsubMessage)
    val messageId = messageIdFuture.get()

    println("Resource ID: $messageId")
    println("Attributes: $messageAttributes")
    println("Topic: $topicName")
  } catch (err: ExecutionException) {
    val message =
      when (val cause = err.cause) {
        is NotFoundException ->
          "error: topic '$topicId' not found in project '$projectId': ${cause.message}"
        is ApiException ->
          "error: failed to publish message to topic '$topicId' in project '$projectId': ${cause.message}"
        else ->
          "error: execution failed while publishing to topic '$topicId' in project '$projectId': ${err.message}"
      }
    System.err.println(message)
  } catch (err: InterruptedException) {
    Thread.currentThread().interrupt()
    System.err.println(
      "error: interrupted while publishing to topic '$topicId' in project '$projectId': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize Publisher for topic '$topicId' in project '$projectId': ${err.message}"
    )
  } finally {
    if (publisher != null) {
      publisher.shutdown()
      try {
        publisher.awaitTermination(1, TimeUnit.MINUTES)
      } catch (err: InterruptedException) {
        Thread.currentThread().interrupt()
      }
    }
  }
}
// [END pubsub_quickstart_publisher]
// [END pubsub_publish_custom_attributes]
// [END pubsub_message_publish]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val topicId =
    args.getOrNull(1)
      ?: System.getenv("TOPIC_ID")
      ?: "example-topic-id"

  publishMessage(projectId, topicId)
}
