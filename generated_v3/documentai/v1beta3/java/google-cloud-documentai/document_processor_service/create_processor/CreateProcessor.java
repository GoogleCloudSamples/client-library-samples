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

// [START documentai_v1beta3_documentprocessorservice_processor_create]
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.Processor;
import java.io.IOException;
import java.util.UUID;

public class CreateProcessor {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us";
    createProcessor(projectId, locationId);
  }

  public static void createProcessor(String projectId, String locationId) throws IOException {
    // Configure regional endpoint for Document AI
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Processor processor =
          Processor.newBuilder()
              .setType("OCR_PROCESSOR")
              .setDisplayName("example-processor-" + UUID.randomUUID())
              .build();

      Processor response = client.createProcessor(parent, processor);

      System.out.println("Processor created: " + response.getName());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("Type: " + response.getType());
      System.out.println("State: " + response.getState());
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_processor_create]
