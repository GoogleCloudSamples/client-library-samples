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

// [START bigqueryreservation_v1_reservationservice_reservationgroup_delete]
// [START bigqueryreservation_reservationservice_reservationgroup_delete]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.DeleteReservationGroupRequest;
import com.google.cloud.bigquery.reservation.v1.ReservationGroupName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class DeleteReservationGroup {

  /**
   * Deletes a specified BigQuery reservation group. A reservation group cannot be deleted if it
   * contains any reservations.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation group (for example, "us-central1").
   * @param reservationGroupId The ID of the reservation group to delete (for example,
   *     "example-reservation-group").
   */
  public static void deleteReservationGroup(
      String projectId, String location, String reservationGroupId) {
    ReservationGroupName name =
        ReservationGroupName.of(projectId, location, reservationGroupId);

    DeleteReservationGroupRequest request =
        DeleteReservationGroupRequest.newBuilder().setName(name.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      client.deleteReservationGroup(request);
      System.out.printf("Deleted reservation group: '%s'%n", name);
    } catch (NotFoundException err) {
      System.err.printf(
          "error: reservation group '%s' not found in location '%s' for project '%s': %s%n",
          reservationGroupId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to delete reservation group '%s' in location '%s' for project '%s': %s%n",
          reservationGroupId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_reservationgroup_delete]
  // [END bigqueryreservation_v1_reservationservice_reservationgroup_delete]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = System.getenv("LOCATION");
    String reservationGroupId = System.getenv("RESERVATION_GROUP_ID");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }
    if (args.length > 2) {
      reservationGroupId = args[2];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (location == null || location.isEmpty()) {
      location = "us-central1";
    }
    if (reservationGroupId == null || reservationGroupId.isEmpty()) {
      reservationGroupId = "example-reservation-group";
    }

    deleteReservationGroup(projectId, location, reservationGroupId);
  }
}
