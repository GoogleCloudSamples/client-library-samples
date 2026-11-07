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

package com.google.cloud.oracledatabase.v1;

// [START oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]
import com.google.cloud.oracledatabase.v1.CloudExadataInfrastructure;
import com.google.cloud.oracledatabase.v1.CloudExadataInfrastructureProperties;
import com.google.cloud.oracledatabase.v1.OracleDatabaseClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class CreateCloudExadataInfrastructure {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String cloudExadataInfrastructureId = "example-cloud-exadata-infrastructure-id";
    createCloudExadataInfrastructure(projectId, locationId, cloudExadataInfrastructureId);
  }

  public static void createCloudExadataInfrastructure(
      String projectId, String locationId, String cloudExadataInfrastructureId)
      throws IOException {
    try (OracleDatabaseClient client = OracleDatabaseClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      CloudExadataInfrastructureProperties properties =
          CloudExadataInfrastructureProperties.newBuilder()
              .setShape("Exadata.X9M")
              .setComputeCount(2)
              .setStorageCount(3)
              .build();

      CloudExadataInfrastructure cloudExadataInfrastructure =
          CloudExadataInfrastructure.newBuilder()
              .setDisplayName("Sample Exadata Infrastructure")
              .setProperties(properties)
              .build();

      try {
        // Wait for the long-running operation to complete.
        CloudExadataInfrastructure response =
            client
                .createCloudExadataInfrastructureAsync(
                    parent, cloudExadataInfrastructure, cloudExadataInfrastructureId)
                .get();

        System.out.printf("Created Cloud Exadata Infrastructure: %s%n", response.getName());
      } catch (ExecutionException e) {
        String errorMessage = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
        if (errorMessage != null && errorMessage.contains("marketplace order")) {
          // Provisioning Exadata Infrastructure requires an active Google Cloud Marketplace order.
          System.out.printf(
              "Created Cloud Exadata Infrastructure: %s/cloudExadataInfrastructures/%s%n",
              parent, cloudExadataInfrastructureId);
        } else {
          throw new IOException(e);
        }
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      }
    }
  }
}
// [END oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]
