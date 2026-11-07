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

// [START bigqueryreservation_v1_reservationservice_iampolicy_get]
import com.google.cloud.bigquery.reservation.v1.ReservationName;
import com.google.cloud.bigquery.reservation.v1.ReservationServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String reservationId = "example-reservation-id";
    getIamPolicy(projectId, locationId, reservationId);
  }

  public static void getIamPolicy(String projectId, String locationId, String reservationId)
      throws IOException {
    // Initialize the client once and reuse it across multiple requests.
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      String resource = ReservationName.of(projectId, locationId, reservationId).toString();
      GetIamPolicyRequest request = GetIamPolicyRequest.newBuilder().setResource(resource).build();

      Policy response = client.getIamPolicy(request);

      System.out.println("Retrieved IAM policy for: " + resource);
      for (Binding binding : response.getBindingsList()) {
        System.out.printf("Role: %s, Members: %s%n", binding.getRole(), binding.getMembersList());
      }
    }
  }
}
// [END bigqueryreservation_v1_reservationservice_iampolicy_get]
