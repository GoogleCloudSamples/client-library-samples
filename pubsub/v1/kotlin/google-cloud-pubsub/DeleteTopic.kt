// [START pubsub_delete_topic]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
import com.google.cloud.pubsub.v1.TopicAdminClient
import com.google.pubsub.v1.TopicName
import java.io.IOException

/**
 * Deletes an existing Google Cloud Pub/Sub topic.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param topicId Pub/Sub topic identifier to delete (for example, "example-topic-id").
 */
fun deleteTopic(projectId: String, topicId: String) {
  val topicName = TopicName.of(projectId, topicId)

  try {
    TopicAdminClient.create().use { topicAdminClient ->
      topicAdminClient.deleteTopic(topicName)

      println("Resource ID: $topicName")
      println("Deleted: true")
      println("Topic ID: $topicId")
    }
  } catch (err: NotFoundException) {
    System.err.println(
      "error: topic '$topicId' not found in project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to delete topic '$topicId' in project '$projectId': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize TopicAdminClient for topic '$topicId' in project '$projectId': ${err.message}"
    )
  }
}
// [END pubsub_delete_topic]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val topicId =
    args.getOrNull(1)
      ?: System.getenv("TOPIC_ID")
      ?: "example-topic-id"

  deleteTopic(projectId, topicId)
}
