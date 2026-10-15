// [START pubsub_subscription_subscribe_async]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
import com.google.cloud.pubsub.v1.AckReplyConsumer
import com.google.cloud.pubsub.v1.MessageReceiver
import com.google.cloud.pubsub.v1.Subscriber
import com.google.pubsub.v1.ProjectSubscriptionName
import com.google.pubsub.v1.PubsubMessage
import java.util.concurrent.TimeUnit
import java.util.concurrent.TimeoutException

/**
 * Receives and acknowledges messages asynchronously from a Pub/Sub pull
 * subscription over a bounded listening window.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param subscriptionId Pub/Sub subscription identifier (for example, "example-subscription-id").
 */
fun subscribeAsync(projectId: String, subscriptionId: String) {
  val subscriptionName = ProjectSubscriptionName.of(projectId, subscriptionId)

  val receiver = MessageReceiver { message: PubsubMessage, consumer: AckReplyConsumer ->
    println("Resource ID: ${message.messageId}")
    println("Creation Date: ${message.publishTime}")
    println("Data: ${message.data.toStringUtf8()}")
    consumer.ack()
  }

  var subscriber: Subscriber? = null
  try {
    subscriber = Subscriber.newBuilder(subscriptionName, receiver).build()
    println("Listening for messages on '$subscriptionName'...")
    subscriber.startAsync().awaitRunning()
    subscriber.awaitTerminated(5, TimeUnit.SECONDS)
  } catch (err: TimeoutException) {
    println("Resource ID: $subscriptionName")
    println("Status: COMPLETED_WINDOW")
    println("Subscription ID: $subscriptionId")
  } catch (err: NotFoundException) {
    System.err.println(
      "error: subscription '$subscriptionId' not found in project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to receive messages from subscription '$subscriptionId' in project '$projectId': ${err.message}"
    )
  } catch (err: IllegalStateException) {
    System.err.println(
      "error: subscriber failed on subscription '$subscriptionId' in project '$projectId': ${err.message}"
    )
  } finally {
    subscriber?.stopAsync()?.awaitTerminated()
  }
}
// [END pubsub_subscription_subscribe_async]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val subscriptionId =
    args.getOrNull(1)
      ?: System.getenv("SUBSCRIPTION_ID")
      ?: "example-subscription-id"

  subscribeAsync(projectId, subscriptionId)
}
