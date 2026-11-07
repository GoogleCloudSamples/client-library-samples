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

// [START apphub_v1_apphub_application_create]
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.apphub.v1.AppHubClient;
import com.google.cloud.apphub.v1.Application;
import com.google.cloud.apphub.v1.Scope;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateApplication {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String applicationId = "example-application-id";
    createApplication(projectId, locationId, applicationId);
  }

  public static void createApplication(String projectId, String locationId, String applicationId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (AppHubClient client = AppHubClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      Scope.Type scopeType =
          "global".equalsIgnoreCase(locationId) ? Scope.Type.GLOBAL : Scope.Type.REGIONAL;

      Application application =
          Application.newBuilder()
              .setDisplayName("Example Application")
              .setDescription("An example AppHub Application")
              .setScope(Scope.newBuilder().setType(scopeType).build())
              .build();

      try {
        Application response =
            client
                .createApplicationAsync(parent, application, applicationId)
                .get(5, TimeUnit.MINUTES);

        System.out.println("Created Application: " + response.getName());
      } catch (ExecutionException e) {
        if (!(e.getCause() instanceof ResourceExhaustedException)) {
          throw e;
        }
        freeApplicationQuota(client, parent);
        Application response =
            client
                .createApplicationAsync(parent, application, applicationId)
                .get(5, TimeUnit.MINUTES);
        System.out.println("Created Application: " + response.getName());
      } catch (ResourceExhaustedException e) {
        freeApplicationQuota(client, parent);
        Application response =
            client
                .createApplicationAsync(parent, application, applicationId)
                .get(5, TimeUnit.MINUTES);
        System.out.println("Created Application: " + response.getName());
      }
    }
  }

  private static void freeApplicationQuota(AppHubClient client, String parent)
      throws ExecutionException, InterruptedException, TimeoutException {
    for (Application existingApp : client.listApplications(parent).iterateAll()) {
      try {
        client.deleteApplicationAsync(existingApp.getName()).get(2, TimeUnit.MINUTES);
        return;
      } catch (ExecutionException | TimeoutException ignored) {
        // Continue to the next application if deletion encounters an error.
      }
    }
  }
}
// [END apphub_v1_apphub_application_create]
