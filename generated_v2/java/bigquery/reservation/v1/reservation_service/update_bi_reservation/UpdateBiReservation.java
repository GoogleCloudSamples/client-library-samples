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

// [START bigqueryreservation_v1_reservationservice_bireservation_update]
import com.google.cloud.bigquery.reservation.v1.BiReservation;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateBiReservation {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    updateBiReservation(projectId, locationId);
  }

  public static void updateBiReservation(String projectId, String locationId) throws IOException {
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      // Configure reservation capacity to 1 GB (1073741824 bytes)
      BiReservation biReservation =
          BiReservation.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/biReservation", projectId, locationId))
              .setSize(1073741824L)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("size").build();

      BiReservation response = client.updateBiReservation(biReservation, updateMask);
      System.out.println("Updated BI reservation: " + response.getName());
      System.out.println("Capacity size in bytes: " + response.getSize());
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_bireservation_update]
