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

// [START pubsub_v1_subscriber_subscription_delete]
// [START pubsub_subscriber_subscription_delete]
// [START pubsub_delete_subscription]
import com.google.api.gax.rpc.ApiException
import com.google.api.gax.rpc.NotFoundException
import com.google.cloud.pubsub.v1.SubscriptionAdminClient
import com.google.pubsub.v1.SubscriptionName
import java.io.IOException

/**
 * Deletes an existing Google Cloud Pub/Sub subscription.
 *
 * @param projectId Google Cloud project identifier (for example, "example-project-id").
 * @param subscriptionId Pub/Sub subscription identifier to delete (for example, "example-subscription-id").
 */
fun deleteSubscription(projectId: String, subscriptionId: String) {
  val subscriptionName = SubscriptionName.of(projectId, subscriptionId)

  try {
    SubscriptionAdminClient.create().use { subscriptionAdminClient ->
      subscriptionAdminClient.deleteSubscription(subscriptionName)

      println("Resource ID: $subscriptionName")
      println("Deleted: true")
      println("Subscription ID: $subscriptionId")
    }
  } catch (err: NotFoundException) {
    System.err.println(
      "error: subscription '$subscriptionId' not found in project '$projectId': ${err.message}"
    )
  } catch (err: ApiException) {
    System.err.println(
      "error: failed to delete subscription '$subscriptionId' in project '$projectId': ${err.message}"
    )
  } catch (err: IOException) {
    System.err.println(
      "error: failed to initialize SubscriptionAdminClient for subscription '$subscriptionId' in project '$projectId': ${err.message}"
    )
  }
}
// [END pubsub_delete_subscription]
// [END pubsub_subscriber_subscription_delete]
// [END pubsub_v1_subscriber_subscription_delete]

fun main(args: Array<String>) {
  val projectId =
    args.getOrNull(0)
      ?: System.getenv("GOOGLE_CLOUD_PROJECT")
      ?: "example-project-id"
  val subscriptionId =
    args.getOrNull(1)
      ?: System.getenv("SUBSCRIPTION_ID")
      ?: "example-subscription-id"

  deleteSubscription(projectId, subscriptionId)
}
