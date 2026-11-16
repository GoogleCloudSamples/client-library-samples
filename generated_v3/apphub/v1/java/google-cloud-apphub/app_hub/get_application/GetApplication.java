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

// [START apphub_v1_apphub_application_get]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.Application;
import com.google.cloud.apphub.v1.ApplicationName;
import java.io.IOException;

public class GetApplication {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String applicationId = "example-application_id";
    getApplication(projectId, locationId, applicationId);
  }

  public static void getApplication(String projectId, String locationId, String applicationId)
      throws Exception {
    try (AppHubClient client = AppHubClient.create()) {
      String name = ApplicationName.of(projectId, locationId, applicationId).toString();
      Application response = client.getApplication(name);

      System.out.println("Application name: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("Description: " + response.getDescription());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END apphub_v1_apphub_application_get]
