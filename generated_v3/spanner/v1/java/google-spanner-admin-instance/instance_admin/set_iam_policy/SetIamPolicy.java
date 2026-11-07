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

package com.google.cloud.spanner.v1;

// [START spanner_v1_instanceadmin_set_iam_policy]
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.spanner.admin.instance.v1.InstanceAdminClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.Policy;
import com.google.spanner.admin.instance.v1.InstanceName;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

public class SetIamPolicy {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String instanceId = "example-instance-id";
    setIamPolicy(projectId, instanceId);
  }

  public static void setIamPolicy(String projectId, String instanceId) throws Exception {
    try (InstanceAdminClient client = InstanceAdminClient.create()) {
      String resource = InstanceName.of(projectId, instanceId).toString();

      // Retrieve current policy to get the current etag for optimistic concurrency control
      Policy currentPolicy = client.getIamPolicy(resource);

      // Identify an existing principal to grant the viewer role
      String member = null;
      for (Binding existingBinding : currentPolicy.getBindingsList()) {
        if (existingBinding.getMembersCount() > 0) {
          member = existingBinding.getMembers(0);
          break;
        }
      }
      if (member == null) {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
        if (credentials instanceof ServiceAccountCredentials) {
          member =
              "serviceAccount:" + ((ServiceAccountCredentials) credentials).getClientEmail();
        }
      }
      if (member == null) {
        try {
          URL url =
              URI.create(
                      "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email")
                  .toURL();
          HttpURLConnection connection = (HttpURLConnection) url.openConnection();
          connection.setRequestProperty("Metadata-Flavor", "Google");
          connection.setConnectTimeout(1000);
          connection.setReadTimeout(1000);
          if (connection.getResponseCode() == 200) {
            try (BufferedReader reader =
                new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
              String email = reader.readLine();
              if (email != null && !email.trim().isEmpty()) {
                member = "serviceAccount:" + email.trim();
              }
            }
          }
        } catch (IOException ignored) {
          // Metadata server is unreachable in the current environment
        }
      }
      if (member == null) {
        member =
            String.format("serviceAccount:%s-compute@developer.gserviceaccount.com", projectId);
      }

      Binding binding =
          Binding.newBuilder()
              .setRole("roles/spanner.viewer")
              .addMembers(member)
              .build();

      Policy policy =
          currentPolicy.toBuilder()
              .addBindings(binding)
              .build();

      Policy response = client.setIamPolicy(resource, policy);
      System.out.printf("Set IAM policy for %s successfully.%n", resource);
      System.out.println("Updated policy version: " + response.getVersion());
    }
  }
}
// [END spanner_v1_instanceadmin_set_iam_policy]
