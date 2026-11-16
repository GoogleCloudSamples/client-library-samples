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

// [START apphub_v1_apphub_application_delete]
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.ApplicationName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteApplication {

  public static void deleteApplication(
      String projectId, String locationId, String applicationId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (AppHubClient client = AppHubClient.create()) {
      String name = ApplicationName.of(projectId, locationId, applicationId).toString();

      // Wait for the long-running operation to complete.
      client.deleteApplicationAsync(name).get(5, TimeUnit.MINUTES);
      System.out.printf("Deleted application: %s%n", name);
    }
  }
}
// [END apphub_v1_apphub_application_delete]
