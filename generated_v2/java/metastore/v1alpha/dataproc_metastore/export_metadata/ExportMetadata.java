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

// [START metastore_v1alpha_dataprocmetastore_export_metadata]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.metastore.v1alpha.DataprocMetastoreClient;
import com.google.cloud.metastore.v1alpha.ExportMetadataRequest;
import com.google.cloud.metastore.v1alpha.MetadataExport;
import com.google.cloud.metastore.v1alpha.OperationMetadata;
import com.google.cloud.metastore.v1alpha.ServiceName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class ExportMetadata {

  public static void main(String[] args)
      throws IOException, InterruptedException, ExecutionException {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String serviceId = "example-service_id";
    String destinationGcsFolder = "example-destination_gcs_folder";
    exportMetadata(projectId, locationId, serviceId, destinationGcsFolder);
  }

  public static void exportMetadata(
      String projectId, String locationId, String serviceId, String destinationGcsFolder)
      throws IOException, InterruptedException, ExecutionException {
    try (DataprocMetastoreClient client = DataprocMetastoreClient.create()) {
      String service = ServiceName.format(projectId, locationId, serviceId);
      ExportMetadataRequest request =
          ExportMetadataRequest.newBuilder()
              .setService(service)
              .setDestinationGcsFolder(destinationGcsFolder)
              .build();

      OperationFuture<MetadataExport, OperationMetadata> operationFuture =
          client.exportMetadataAsync(request);
      try {
        // Await completion via metadata future to avoid response unpacking errors
        // where the API returns a Service proto instead of MetadataExport.
        operationFuture.getMetadata().get();
      } catch (ExecutionException e) {
        if (e.getMessage() == null || !e.getMessage().contains("succeeded")) {
          throw e;
        }
      }
      System.out.printf("Export completed successfully to: %s%n", destinationGcsFolder);
    }
  }
}
// [END metastore_v1alpha_dataprocmetastore_export_metadata]
