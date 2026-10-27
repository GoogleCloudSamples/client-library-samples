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

// [START bigqueryreservation_v1_reservationservice_bireservation_get]
// [START bigqueryreservation_reservationservice_bireservation_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.BiReservation;
import com.google.cloud.bigquery.reservation.v1.BiReservationName;
import com.google.cloud.bigquery.reservation.v1.GetBiReservationRequest;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class GetBiReservation {

  /**
   * Retrieves the singleton BigQuery BI Engine reservation for a given project and location.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the BI reservation (for example, "us-central1").
   */
  public static void getBiReservation(String projectId, String location) {
    BiReservationName name = BiReservationName.of(projectId, location);

    GetBiReservationRequest request =
        GetBiReservationRequest.newBuilder().setName(name.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      BiReservation reservation = client.getBiReservation(request);
      System.out.printf("Got BI reservation: %s%n", reservation.getName());
      System.out.printf("  Size: %d bytes%n", reservation.getSize());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: BI reservation not found in location '%s' for project '%s': %s%n",
          location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get BI reservation in location '%s' for project '%s': %s%n",
          location, projectId, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_bireservation_get]
  // [END bigqueryreservation_v1_reservationservice_bireservation_get]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = System.getenv("LOCATION");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }

    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }
    if (location == null || location.isEmpty()) {
      location = "us-central1";
    }

    getBiReservation(projectId, location);
  }
}
