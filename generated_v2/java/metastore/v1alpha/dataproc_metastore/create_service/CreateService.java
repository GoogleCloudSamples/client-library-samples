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

package com.google.cloud.metastore.v1alpha;

// [START metastore_v1alpha_dataprocmetastore_service_create]
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.metastore.v1alpha.DataprocMetastoreClient;
import com.google.cloud.metastore.v1alpha.LocationName;
import com.google.cloud.metastore.v1alpha.Service;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateService {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location-id";
    String serviceId = "example-service-id";
    String projectId = "example-project-id";
    createService(locationId, serviceId, projectId);
  }

  public static void createService(String locationId, String serviceId, String projectId)
      throws Exception {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      Service service = Service.newBuilder()
          .setTier(Service.Tier.DEVELOPER)
          .build();

      try {
        Service createdService = client.createServiceAsync(parent, service, serviceId).get();
        System.out.println("Created service: " + createdService.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ResourceExhaustedException) {
          System.out.println("Quota limit reached for region: " + locationId);
        } else {
          throw e;
        }
      } catch (ResourceExhaustedException e) {
        System.out.println("Quota limit reached for region: " + locationId);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.out.println("Service creation operation interrupted: " + e.getMessage());
      }
    }
  }
}
// [END metastore_v1alpha_dataprocmetastore_service_create]
