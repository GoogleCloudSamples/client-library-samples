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

// [START documentai_v1beta3_documentprocessorservice_processor_get]
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.Processor;
import com.google.cloud.documentai.v1beta3.ProcessorName;

public class GetProcessor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    getProcessor(projectId, locationId, processorId);
  }

  public static void getProcessor(String projectId, String locationId, String processorId)
      throws Exception {
    // Initialize the regional endpoint required by Document AI.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name = ProcessorName.of(projectId, locationId, processorId).toString();

      Processor processor = client.getProcessor(name);

      System.out.printf("Processor name: %s%n", processor.getName());
      System.out.printf("Display name: %s%n", processor.getDisplayName());
      System.out.printf("Type: %s%n", processor.getType());
      System.out.printf("State: %s%n", processor.getState());
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_processor_get]
