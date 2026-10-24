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

// [START bigqueryreservation_v1_reservationservice_reservation_update]
// [START bigqueryreservation_reservationservice_reservation_update]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.Reservation;
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import com.google.cloud.bigquery.reservation.v1.UpdateReservationRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateReservation {

  /**
   * Updates an existing BigQuery reservation's slot capacity. A reservation must exist before it
   * can be updated.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation (for example, "us-central1").
   * @param reservationId The ID of the reservation to update (for example, "example-reservation").
   */
  public static void updateReservation(String projectId, String location, String reservationId) {
    ReservationName name = ReservationName.of(projectId, location, reservationId);

    Reservation reservation =
        Reservation.newBuilder().setName(name.toString()).setSlotCapacity(100).build();

    FieldMask updateMask = FieldMask.newBuilder().addPaths("slot_capacity").build();

    UpdateReservationRequest request =
        UpdateReservationRequest.newBuilder()
            .setReservation(reservation)
            .setUpdateMask(updateMask)
            .build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      Reservation updatedReservation = client.updateReservation(request);
      System.out.printf("Updated reservation: %s%n", updatedReservation.getName());
      System.out.printf("New slot capacity: %d%n", updatedReservation.getSlotCapacity());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: reservation '%s' not found in location '%s' for project '%s': %s%n",
          reservationId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to update reservation '%s' in location '%s' for project '%s': %s%n",
          reservationId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_reservation_update]
  // [END bigqueryreservation_v1_reservationservice_reservation_update]

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

    updateReservation(projectId, location, reservationId);
  }
}
