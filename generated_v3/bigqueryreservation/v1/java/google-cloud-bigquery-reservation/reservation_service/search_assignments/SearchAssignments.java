// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.bigqueryreservation.v1;

// [START bigqueryreservation_v1_reservationservice_assignments_search]
import com.google.cloud.bigquery.reservation.v1.Assignment;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class SearchAssignments {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String query = "example-query";
    searchAssignments(projectId, locationId, query);
  }

  public static void searchAssignments(String projectId, String locationId, String query)
      throws IOException {
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      for (Assignment assignment : client.searchAssignments(parent, query).iterateAll()) {
        System.out.printf(
            "Assignment: %s, Assignee: %s, Job type: %s%n",
            assignment.getName(), assignment.getAssignee(), assignment.getJobType());
      }
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_assignments_search]
