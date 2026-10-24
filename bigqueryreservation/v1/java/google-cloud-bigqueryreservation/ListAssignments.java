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

// [START bigqueryreservation_v1_reservationservice_assignments_list]
// [START bigqueryreservation_reservationservice_assignments_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.Assignment;
import com.google.cloud.bigquery.reservation.v1.ListAssignmentsRequest;
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class ListAssignments {

  /**
   * Lists all assignments for a specified BigQuery reservation. To list all assignments in a
   * given location across all reservations, pass "-" as the reservationId.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation (for example, "us-central1").
   * @param reservationId The ID of the reservation to list assignments for, or "-" to list all
   *     assignments for the project and location (for example, "example-reservation").
   */
  public static void listAssignments(String projectId, String location, String reservationId) {
    ReservationName parent = ReservationName.of(projectId, location, reservationId);

    ListAssignmentsRequest request =
        ListAssignmentsRequest.newBuilder().setParent(parent.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      System.out.printf("Listing assignments for parent: '%s'%n", parent);
      boolean foundAssignments = false;
      for (Assignment assignment : client.listAssignments(request).iterateAll()) {
        foundAssignments = true;
        System.out.printf("  Got assignment: %s%n", assignment.getName());
      }

      if (!foundAssignments) {
        System.out.println("No assignments found.");
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: parent resource '%s' not found: %s%n", parent, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list assignments for '%s': %s%n", parent, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_assignments_list]
  // [END bigqueryreservation_v1_reservationservice_assignments_list]

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
      reservationId = "-";
    }

    listAssignments(projectId, location, reservationId);
  }
}
