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

// [START bigqueryreservation_v1_reservationservice_assignment_delete]
// [START bigqueryreservation_reservationservice_assignment_delete]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.reservation.v1.AssignmentName;
import com.google.cloud.bigquery.reservation.v1.DeleteAssignmentRequest;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class DeleteAssignment {

  /**
   * Deletes a BigQuery reservation assignment. This removes the association between a project,
   * folder, or organization and a reservation so jobs from the resource no longer use the
   * reservation's slots.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the reservation (for example, "us-central1").
   * @param reservationId The ID of the reservation that contains the assignment (for example,
   *     "example-reservation").
   * @param assignmentId The ID of the assignment to delete (for example,
   *     "example-assignment-123").
   */
  public static void deleteAssignment(
      String projectId, String location, String reservationId, String assignmentId) {
    AssignmentName name = AssignmentName.of(projectId, location, reservationId, assignmentId);

    DeleteAssignmentRequest request =
        DeleteAssignmentRequest.newBuilder().setName(name.toString()).build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      client.deleteAssignment(request);
      System.out.printf("Deleted assignment: %s%n", name);
    } catch (NotFoundException err) {
      System.err.printf(
          "error: assignment '%s' not found: %s%n", name, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to delete assignment '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_assignment_delete]
  // [END bigqueryreservation_v1_reservationservice_assignment_delete]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    String location = System.getenv("LOCATION");
    String reservationId = System.getenv("RESERVATION_ID");
    String assignmentId = System.getenv("ASSIGNMENT_ID");

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      location = args[1];
    }
    if (args.length > 2) {
      reservationId = args[2];
    }
    if (args.length > 3) {
      assignmentId = args[3];
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
    if (assignmentId == null || assignmentId.isEmpty()) {
      assignmentId = "example-assignment-123";
    }

    deleteAssignment(projectId, location, reservationId, assignmentId);
  }
}
