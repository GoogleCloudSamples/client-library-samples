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

package com.google.cloud.dataplex.v1;

// [START dataplex_v1_dataplexservice_lake_create]
import com.google.api.gax.rpc.ResourceExhaustedException;
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.cloud.dataplex.v1.Lake;
import java.util.concurrent.ExecutionException;

public class CreateLake {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String projectId = "example-project_id";
    createLake(locationId, lakeId, projectId);
  }

  public static void createLake(String locationId, String lakeId, String projectId)
      throws Exception {
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Lake lake =
          Lake.newBuilder()
              .setDisplayName("Example Lake")
              .setDescription("Lake created using the Dataplex client")
              .build();

      try {
        // Initiate the long-running operation and wait for completion
        Lake createdLake = client.createLakeAsync(parent, lake, lakeId).get();
        System.out.println("Created lake: " + createdLake.getName());
      } catch (ResourceExhaustedException e) {
        System.out.println("Quota exceeded for lakes in region: " + locationId);
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ResourceExhaustedException) {
          System.out.println("Quota exceeded for lakes in region: " + locationId);
        } else {
          throw e;
        }
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        throw e;
      }
    }
  }
}
// [END dataplex_v1_dataplexservice_lake_create]
