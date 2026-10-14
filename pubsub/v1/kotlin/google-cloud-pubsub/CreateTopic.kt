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
