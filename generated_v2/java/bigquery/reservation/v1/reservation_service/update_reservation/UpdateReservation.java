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

// [START bigqueryreservation_v1_reservationservice_reservation_update]
import com.google.cloud.bigquery.reservation.v1.Reservation;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateReservation {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String reservationId = "example-reservation-id";
    updateReservation(projectId, locationId, reservationId);
  }

  public static void updateReservation(
      String projectId, String locationId, String reservationId) throws IOException {
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      String reservationPath =
          String.format(
              "projects/%s/locations/%s/reservations/%s",
              projectId,
              locationId,
              reservationId);

      // Update inert metadata to avoid impacting existing query workloads.
      Reservation reservation =
          Reservation.newBuilder()
              .setName(reservationPath)
              .putLabels("env", "staging")
              .build();

      // Restrict the update operation strictly to the labels field.
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      Reservation response = client.updateReservation(reservation, updateMask);
      System.out.println("Reservation updated successfully: " + response.getName());
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_reservation_update]
