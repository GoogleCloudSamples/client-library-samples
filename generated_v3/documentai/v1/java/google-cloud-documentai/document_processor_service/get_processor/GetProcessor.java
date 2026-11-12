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

// [START documentai_v1_documentprocessorservice_processor_get]
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1.GetProcessorRequest;
import com.google.cloud.documentai.v1.Processor;
import com.google.cloud.documentai.v1.ProcessorName;

public class GetProcessor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    getProcessor(projectId, locationId, processorId);
  }

  public static void getProcessor(String projectId, String locationId, String processorId)
      throws Exception {
    // Set the regional endpoint for the Document AI service.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    // Initialize the client with Application Default Credentials.
    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name = ProcessorName.of(projectId, locationId, processorId).toString();

      GetProcessorRequest request = GetProcessorRequest.newBuilder().setName(name).build();

      Processor response = client.getProcessor(request);

      System.out.println("Processor Name: " + response.getName());
      System.out.println("Display Name: " + response.getDisplayName());
      System.out.println("Processor Type: " + response.getType());
      System.out.println("Processor State: " + response.getState());
    }
  }
}
// [END documentai_v1_documentprocessorservice_processor_get]
