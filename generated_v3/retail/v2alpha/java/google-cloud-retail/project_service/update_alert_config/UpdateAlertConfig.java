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

package com.google.cloud.retail.v2alpha;

// [START retail_v2alpha_projectservice_alertconfig_update]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2alpha.AlertConfig;
import com.google.cloud.retail.v2alpha.ProjectServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateAlertConfig {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    updateAlertConfig(projectId);
  }

  public static void updateAlertConfig(String projectId) throws IOException {
    try (ProjectServiceClient client = ProjectServiceClient.create()) {
      AlertConfig.AlertPolicy.Recipient recipient =
          AlertConfig.AlertPolicy.Recipient.newBuilder()
              .setEmailAddress("example-alerts@example.com")
              .build();

      AlertConfig.AlertPolicy alertPolicy =
          AlertConfig.AlertPolicy.newBuilder()
              .setAlertGroup("search-data-quality")
              .setEnrollStatus(AlertConfig.AlertPolicy.EnrollStatus.ENROLLED)
              .addRecipients(recipient)
              .build();

      AlertConfig alertConfig =
          AlertConfig.newBuilder()
              .setName(String.format("projects/%s/alertConfig", projectId))
              .addAlertPolicies(alertPolicy)
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("alert_policies").build();

      try {
        AlertConfig response = client.updateAlertConfig(alertConfig, updateMask);
        System.out.println("Alert config updated: " + response.getName());
      } catch (FailedPreconditionException e) {
        System.out.println(
            "Cloud Retail terms must be accepted in the Google Cloud console to update alert config.");
      }
    }
  }
}
// [END retail_v2alpha_projectservice_alertconfig_update]
