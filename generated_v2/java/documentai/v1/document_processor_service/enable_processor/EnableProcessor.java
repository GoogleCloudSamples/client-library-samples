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

package com.google.cloud.documentai.v1;

// [START documentai_v1_documentprocessorservice_enable_processor]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1.EnableProcessorMetadata;
import com.google.cloud.documentai.v1.EnableProcessorRequest;
import com.google.cloud.documentai.v1.EnableProcessorResponse;
import com.google.cloud.documentai.v1.ProcessorName;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class EnableProcessor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    enableProcessor(projectId, locationId, processorId);
  }

  public static void enableProcessor(String projectId, String locationId, String processorId)
      throws Exception {
    // Configure regional endpoint for Document AI
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name = ProcessorName.of(projectId, locationId, processorId).toString();
      EnableProcessorRequest request = EnableProcessorRequest.newBuilder().setName(name).build();

      // EnableProcessor is a long-running operation; wait for it to complete
      OperationFuture<EnableProcessorResponse, EnableProcessorMetadata> future =
          client.enableProcessorAsync(request);
      future.get(5, TimeUnit.MINUTES);

      System.out.printf("Processor enabled successfully: %s%n", name);
    }
  }
}
// [END documentai_v1_documentprocessorservice_enable_processor]
