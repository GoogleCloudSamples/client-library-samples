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

// [START documentai_v1_documentprocessorservice_processortype_get]
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1.GetProcessorTypeRequest;
import com.google.cloud.documentai.v1.ProcessorType;
import com.google.cloud.documentai.v1.ProcessorTypeName;

public class GetProcessorType {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processorTypeId = "example-processor-type-id";
    getProcessorType(projectId, locationId, processorTypeId);
  }

  public static void getProcessorType(String projectId, String locationId, String processorTypeId)
      throws Exception {
    // Configure regional endpoint for Document AI
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String name = ProcessorTypeName.of(projectId, locationId, processorTypeId).toString();

      GetProcessorTypeRequest request =
          GetProcessorTypeRequest.newBuilder().setName(name).build();

      ProcessorType processorType = client.getProcessorType(request);
      System.out.println("Processor Type: " + processorType.getType());
      System.out.println("Category: " + processorType.getCategory());
      System.out.println("Resource Name: " + processorType.getName());
    }
  }
}
// [END documentai_v1_documentprocessorservice_processortype_get]
