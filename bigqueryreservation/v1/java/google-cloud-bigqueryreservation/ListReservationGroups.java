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

// [START bigqueryreservation_v1_reservationservice_reservationgroups_list]
// [START bigqueryreservation_reservationservice_reservationgroups_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.ListReservationGroupsRequest;
import com.google.cloud.bigquery.reservation.v1.LocationName;
import com.google.cloud.bigquery.reservation.v1.ReservationGroup;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class ListReservationGroups {

  /**
   * Lists all BigQuery reservation groups in a given project and location. A reservation group is
   * a container for reservations.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation groups (for example, "us-central1").
   */
  public static void listReservationGroups(String projectId, String location) {
    LocationName parent = LocationName.of(projectId, location);

    ListReservationGroupsRequest request =
        ListReservationGroupsRequest.newBuilder().setParent(parent.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      System.out.printf("Listed reservation groups for parent: '%s'%n", parent);
      for (ReservationGroup group : client.listReservationGroups(request).iterateAll()) {
        System.out.printf("  Reservation group: %s%n", group.getName());
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: parent resource '%s' not found: %s%n", parent, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list reservation groups in '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_reservationgroups_list]
  // [END bigqueryreservation_v1_reservationservice_reservationgroups_list]

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

    listReservationGroups(projectId, location);
  }
}
