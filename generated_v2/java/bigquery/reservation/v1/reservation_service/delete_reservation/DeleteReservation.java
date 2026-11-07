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

// [START bigqueryreservation_v1_reservationservice_reservation_delete]
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import java.io.IOException;

public class DeleteReservation {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String reservationId = "example-reservation-id";
    deleteReservation(projectId, locationId, reservationId);
  }

  public static void deleteReservation(String projectId, String locationId, String reservationId)
      throws IOException {
    // Initialize client using try-with-resources to ensure proper resource cleanup.
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      String name = ReservationName.of(projectId, locationId, reservationId).toString();
      client.deleteReservation(name);
      System.out.println("Reservation deleted: " + name);
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservation_delete]
