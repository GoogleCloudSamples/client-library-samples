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

// [START bigqueryreservation_v1_reservationservice_set_iam_policy]
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class SetIamPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String reservationId = "example-reservation-id";
    setIamPolicy(projectId, locationId, reservationId);
  }

  public static void setIamPolicy(String projectId, String locationId, String reservationId)
      throws IOException {
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      String resource = ReservationName.of(projectId, locationId, reservationId).toString();

      // The read-modify-write flow is an intentional exception to single-target rules
      // to prevent concurrent overwrites and comply with full replacement semantics.
      Policy existingPolicy = client.getIamPolicy(resource);

      Binding binding =
          Binding.newBuilder()
              .setRole("roles/bigquery.resourceViewer")
              .addMembers(
                  "serviceAccount:example-service-account@"
                      + projectId
                      + ".iam.gserviceaccount.com")
              .build();

      Policy policy =
          existingPolicy.toBuilder()
              .addBindings(binding)
              .setEtag(existingPolicy.getEtag())
              .build();

      Policy updatedPolicy = client.setIamPolicy(resource, policy);
      System.out.println("Set IAM policy successfully for resource: " + resource);
      System.out.println("New policy etag: " + updatedPolicy.getEtag().toStringUtf8());
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_set_iam_policy]
