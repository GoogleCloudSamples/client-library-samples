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

// [START bigqueryreservation_v1_reservationservice_assignment_create]
// [START bigqueryreservation_reservationservice_assignment_create]
import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.bigquery.reservation.v1.Assignment;
import com.google.cloud.bigquery.reservation.v1.CreateAssignmentRequest;
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class CreateAssignment {

  /**
   * Creates a new assignment for a BigQuery reservation so a project can run jobs of a specified
   * type using slots from that reservation.
   *
   * @param projectId The Google Cloud project ID of the reservation owner (for example,
   *     "example-project-id").
   * @param location The geographic location of the reservation (for example, "us-central1").
   * @param reservationId The ID of the reservation to create the assignment in (for example,
   *     "example-reservation").
   */
  public static void createAssignment(String projectId, String location, String reservationId) {
    ReservationName parent = ReservationName.of(projectId, location, reservationId);
    String assignee = String.format("projects/%s", projectId);

    Assignment assignment =
        Assignment.newBuilder()
            .setAssignee(assignee)
            .setJobType(Assignment.JobType.QUERY)
            .build();

    CreateAssignmentRequest request =
        CreateAssignmentRequest.newBuilder()
            .setParent(parent.toString())
            .setAssignment(assignment)
            .build();

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      Assignment createdAssignment = client.createAssignment(request);
      System.out.printf("Created assignment: %s%n", createdAssignment.getName());
    } catch (AlreadyExistsException err) {
      System.err.printf(
          "error: assignment for project '%s' and job type QUERY already exists in reservation '%s': %s%n",
          projectId, reservationId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to create assignment in reservation '%s' for project '%s': %s%n",
          reservationId, projectId, err.getMessage());
    }
  }

  // [END bigqueryreservation_reservationservice_assignment_create]
  // [END bigqueryreservation_v1_reservationservice_assignment_create]

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

    createAssignment(projectId, location, reservationId);
  }
}
