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

package com.google.cloud.apphub.v1;

// [START apphub_v1_apphub_application_update]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.Application;
import com.google.cloud.apphub.v1.ApplicationName;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateApplication {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String applicationId = "example-application_id";
    updateApplication(projectId, locationId, applicationId);
  }

  public static void updateApplication(String projectId, String locationId, String applicationId)
      throws Exception {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (AppHubClient client = AppHubClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();
      Application application =
          Application.newBuilder()
              .setName(ApplicationName.of(projectId, locationId, applicationId).toString())
              .setDescription("Updated application description")
              .build();

      // UpdateApplication is a long-running operation; wait for it to complete.
      Application response =
          client.updateApplicationAsync(application, updateMask).get(5, TimeUnit.MINUTES);
      System.out.println("Updated Application name: " + response.getName());
      System.out.println("Updated Application description: " + response.getDescription());
    }
  }
}
// [END apphub_v1_apphub_application_update]
