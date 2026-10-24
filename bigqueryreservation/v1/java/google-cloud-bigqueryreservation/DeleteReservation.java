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

// [START bigqueryreservation_v1_reservationservice_reservation_delete]
// [START bigqueryreservation_reservationservice_reservation_delete]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.DeleteReservationRequest;
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class DeleteReservation {

  /**
   * Deletes a specified BigQuery reservation. A reservation can only be deleted if it has no
   * active assignments.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation (for example, "us-central1").
   * @param reservationId The ID of the reservation to delete (for example, "example-reservation").
   */
  public static void deleteReservation(String projectId, String location, String reservationId) {
    ReservationName name = ReservationName.of(projectId, location, reservationId);

    DeleteReservationRequest request =
        DeleteReservationRequest.newBuilder().setName(name.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      client.deleteReservation(request);
      System.out.printf("Deleted reservation: %s%n", name);
    } catch (NotFoundException err) {
      System.err.printf(
          "error: reservation '%s' not found in location '%s' for project '%s': %s%n",
          reservationId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to delete reservation '%s' in location '%s' for project '%s': %s%n",
          reservationId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_reservation_delete]
  // [END bigqueryreservation_v1_reservationservice_reservation_delete]

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

    deleteReservation(projectId, location, reservationId);
  }
}
