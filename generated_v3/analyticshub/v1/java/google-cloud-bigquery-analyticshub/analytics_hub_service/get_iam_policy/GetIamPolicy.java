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

package com.google.cloud.analyticshub.v1;

// [START analyticshub_v1_analyticshubservice_iampolicy_get]
import com.google.cloud.bigquery.analyticshub.v1.AnalyticsHubServiceClient;
import com.google.cloud.bigquery.analyticshub.v1.DataExchangeName;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dataExchangeId = "example-data-exchange-id";
    getIamPolicy(projectId, locationId, dataExchangeId);
  }

  public static void getIamPolicy(String projectId, String locationId, String dataExchangeId)
      throws IOException {
    try (AnalyticsHubServiceClient client = AnalyticsHubServiceClient.create()) {
      String resource = DataExchangeName.of(projectId, locationId, dataExchangeId).toString();
      GetIamPolicyRequest request = GetIamPolicyRequest.newBuilder().setResource(resource).build();

      Policy policy = client.getIamPolicy(request);

      System.out.printf("Retrieved IAM policy for resource: %s%n", resource);
      System.out.printf("Policy version: %d%n", policy.getVersion());
    }
  }
}
// [END analyticshub_v1_analyticshubservice_iampolicy_get]
