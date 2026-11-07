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

// [START dataplex_v1_dataplexservice_lake_delete]
import com.google.cloud.dataplex.v1.DataplexServiceClient;
import com.google.cloud.dataplex.v1.LakeName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteLake {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String lakeId = "example-lake_id";
    String projectId = "example-project_id";
    deleteLake(locationId, lakeId, projectId);
  }

  public static void deleteLake(String locationId, String lakeId, String projectId)
      throws Exception {
    try (DataplexServiceClient client = DataplexServiceClient.create()) {
      String name = LakeName.of(projectId, locationId, lakeId).toString();
      // Dataplex lake deletion is a long-running operation.
      client.deleteLakeAsync(name).get(10, TimeUnit.MINUTES);
      System.out.println("Deleted lake: " + name);
    }
  }
}
// [END dataplex_v1_dataplexservice_lake_delete]
