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

// [START documentai_v1beta3_documentprocessorservice_disable_processor]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.documentai.v1beta3.DisableProcessorMetadata;
import com.google.cloud.documentai.v1beta3.DisableProcessorRequest;
import com.google.cloud.documentai.v1beta3.DisableProcessorResponse;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.ProcessorName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DisableProcessor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processorId = "example-processor-id";
    disableProcessor(projectId, locationId, processorId);
  }

  public static void disableProcessor(String projectId, String locationId, String processorId)
      throws Exception {
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name = ProcessorName.of(projectId, locationId, processorId).toString();

      DisableProcessorRequest request =
          DisableProcessorRequest.newBuilder().setName(name).build();

      // DisableProcessor is a long-running operation; wait for the operation to complete.
      OperationFuture<DisableProcessorResponse, DisableProcessorMetadata> future =
          client.disableProcessorAsync(request);
      future.get(300, TimeUnit.SECONDS);

      System.out.printf("Processor disabled successfully: %s%n", name);
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_disable_processor]
