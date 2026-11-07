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

package com.google.cloud.documentai.v1beta3;

// [START documentai_v1beta3_documentprocessorservice_deploy_processor_version]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.documentai.v1beta3.DeployProcessorVersionMetadata;
import com.google.cloud.documentai.v1beta3.DeployProcessorVersionRequest;
import com.google.cloud.documentai.v1beta3.DeployProcessorVersionResponse;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.ProcessorVersionName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeployProcessorVersion {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processorId = "example-processor-id";
    String processorVersionId = "example-processor-version-id";
    deployProcessorVersion(projectId, locationId, processorId, processorVersionId);
  }

  public static void deployProcessorVersion(
      String projectId, String locationId, String processorId, String processorVersionId)
      throws Exception {
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name =
          ProcessorVersionName.of(projectId, locationId, processorId, processorVersionId)
              .toString();

      DeployProcessorVersionRequest request =
          DeployProcessorVersionRequest.newBuilder().setName(name).build();

      try {
        OperationFuture<DeployProcessorVersionResponse, DeployProcessorVersionMetadata> future =
            client.deployProcessorVersionAsync(request);

        // DeployProcessorVersion is a long-running operation; wait for it to complete.
        future.get(10, TimeUnit.MINUTES);
        System.out.println("Processor version deployed successfully: " + name);
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException
            && e.getCause().getMessage() != null
            && e.getCause().getMessage().contains("DEPLOYED")) {
          System.out.println("Processor version is already deployed: " + name);
        } else {
          throw e;
        }
      } catch (FailedPreconditionException e) {
        if (e.getMessage() != null && e.getMessage().contains("DEPLOYED")) {
          System.out.println("Processor version is already deployed: " + name);
        } else {
          throw e;
        }
      }
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_deploy_processor_version]
