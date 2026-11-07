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

// [START bigqueryreservation_v1_reservationservice_reservationgroups_list]
import com.google.cloud.bigquery.reservation.v1.ReservationGroup;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class ListReservationGroups {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listReservationGroups(projectId, locationId);
  }

  public static void listReservationGroups(String projectId, String locationId) throws IOException {
    String parent = String.format("projects/%s/locations/%s", projectId, locationId);

    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      for (ReservationGroup reservationGroup : client.listReservationGroups(parent).iterateAll()) {
        System.out.println("Reservation group: " + reservationGroup.getName());
      }
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservationgroups_list]
