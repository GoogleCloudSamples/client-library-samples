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

// [START bigqueryreservation_v1_reservationservice_iampolicy_get]
// [START bigqueryreservation_reservationservice_iampolicy_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  /**
   * Retrieves the IAM policy for a specified BigQuery reservation. An IAM policy is a collection
   * of bindings that associates one or more principals with a single role.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation (for example, "us-central1").
   * @param reservationId The ID of the reservation to retrieve the IAM policy for (for example,
   *     "example-reservation").
   */
  public static void getReservationIamPolicy(
      String projectId, String location, String reservationId) {
    ReservationName resource = ReservationName.of(projectId, location, reservationId);

    GetIamPolicyRequest request =
        GetIamPolicyRequest.newBuilder().setResource(resource.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      Policy policy = client.getIamPolicy(request);
      System.out.printf("Got IAM policy for reservation: %s%n", resource);
      for (Binding binding : policy.getBindingsList()) {
        System.out.printf("  Role: %s%n", binding.getRole());
        System.out.printf("  Members: %s%n", binding.getMembersList());
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: reservation '%s' not found: %s%n", resource, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get IAM policy for reservation '%s': %s%n", resource, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_iampolicy_get]
  // [END bigqueryreservation_v1_reservationservice_iampolicy_get]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = System.getenv("LOCATION");
    String reservationId = System.getenv("RESERVATION_ID");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }
    if (args.length > 2) {
      reservationId = args[2];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (location == null || location.isEmpty()) {
      location = "us-central1";
    }
    if (reservationId == null || reservationId.isEmpty()) {
      reservationId = "example-reservation";
    }

    getReservationIamPolicy(projectId, location, reservationId);
  }
}
