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

package com.google.cloud.managedidentities.v1;

// [START managedidentities_v1_managedidentitiesservice_microsoftaddomain_create]
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.managedidentities.v1.Domain;
import com.google.cloud.managedidentities.v1.ManagedIdentitiesServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateMicrosoftAdDomain {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String domainId = "example-domain.com";
    createMicrosoftAdDomain(projectId, locationId, domainId);
  }

  public static void createMicrosoftAdDomain(String projectId, String locationId, String domainId)
      throws IOException, ExecutionException, InterruptedException {
    try (ManagedIdentitiesServiceClient client = ManagedIdentitiesServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Domain domain =
          Domain.newBuilder()
              .setReservedIpRange("10.0.0.0/24")
              .addLocations("us-central1")
              .build();

      try {
        // Long-running operation: wait for domain creation to finish.
        Domain response = client.createMicrosoftAdDomainAsync(parent, domainId, domain).get();
        System.out.println("Created domain: " + response.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ResourceExhaustedException) {
          System.out.println("Domain creation quota reached for: " + domainId);
        } else {
          throw e;
        }
      } catch (ResourceExhaustedException e) {
        System.out.println("Domain creation quota reached for: " + domainId);
      }
    }
  }
}
// [END managedidentities_v1_managedidentitiesservice_microsoftaddomain_create]
