// [START pubsub_v1_subscriber_subscription_create]
// [START pubsub_subscriber_subscription_create]
import com.google.api.gax.rpc.AlreadyExistsException
import com.google.api.gax.rpc.ApiException
import com.google.cloud.pubsub.v1.SubscriptionAdminClient
import com.google.pubsub.v1.PushConfig
import com.google.pubsub.v1.SubscriptionName
import com.google.pubsub.v1.TopicName
import java.io.IOException

/**
 * Creates a pull subscription attached to a Google Cloud Pub/Sub topic.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param topicId Existing Pub/Sub topic identifier (for example, "example-topic-id").
 * @param subscriptionId Identifier for the new subscription (for example, "example-subscription-id").
 */
fun createSubscription(
  projectId: String,
  topicId: String,
  subscriptionId: String,
) {
  val topicName = TopicName.of(projectId, topicId)
  val subscriptionName = SubscriptionName.of(projectId, subscriptionId)

  // An empty PushConfig configures standard pull delivery with a 10-second ack deadline.
  val pushConfig = PushConfig.getDefaultInstance()
  val ackDeadlineSeconds = 10

  try {
    SubscriptionAdminClient.create().use { subscriptionAdminClient ->
      val response =
        subscriptionAdminClient.createSubscription(
          subscriptionName,
          topicName,
          pushConfig,
          ackDeadlineSeconds,
        )

      println("Resource ID: ${response.name}")
      println("Ack Deadline Seconds: ${response.ackDeadlineSeconds}")
      println("Topic: ${response.topic}")
    }
  } catch (err: AlreadyExistsException) {
    System.err.println(
      "error: subscription '$subscriptionId' already exists on topic '$topicId' in project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to create subscription '$subscriptionId' on topic '$topicId' in project '$projectId': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize SubscriptionAdminClient for subscription '$subscriptionId' on topic '$topicId' in project '$projectId': ${err.message}"
    )
  }
}
// [END pubsub_subscriber_subscription_create]
// [END pubsub_v1_subscriber_subscription_create]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val topicId =
    args.getOrNull(1)
      ?: System.getenv("TOPIC_ID")
      ?: "example-topic-id"
  val subscriptionId =
    args.getOrNull(2)
      ?: System.getenv("SUBSCRIPTION_ID")
      ?: "example-subscription-id"

  createSubscription(projectId, topicId, subscriptionId)
}
