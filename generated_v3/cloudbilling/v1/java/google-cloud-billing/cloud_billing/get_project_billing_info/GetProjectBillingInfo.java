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

package com.google.cloud.cloudbilling.v1;

// [START cloudbilling_v1_cloudbilling_projectbillinginfo_get]
import com.google.cloud.billing.v1.CloudBillingClient;
import com.google.cloud.billing.v1.ProjectBillingInfo;
import java.io.IOException;

public class GetProjectBillingInfo {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    getProjectBillingInfo(projectId);
  }

  public static void getProjectBillingInfo(String projectId) throws IOException {
    try (CloudBillingClient client = CloudBillingClient.create()) {
      String name = "projects/" + projectId;
      ProjectBillingInfo response = client.getProjectBillingInfo(name);

      System.out.println("Project billing account: " + response.getBillingAccountName());
      System.out.println("Billing enabled: " + response.getBillingEnabled());
    }
  }
}
// [END cloudbilling_v1_cloudbilling_projectbillinginfo_get]
