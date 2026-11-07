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

// [START documentai_v1beta3_documentprocessorservice_evaluations_list]
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.Evaluation;
import com.google.cloud.documentai.v1beta3.ProcessorVersionName;

public class ListEvaluations {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    String processorVersionId = "example-processor_version_id";
    listEvaluations(projectId, locationId, processorId, processorVersionId);
  }

  public static void listEvaluations(
      String projectId, String locationId, String processorId, String processorVersionId)
      throws Exception {
    // Configure the client to connect to the regional endpoint.
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String parent =
          ProcessorVersionName.of(projectId, locationId, processorId, processorVersionId)
              .toString();

      for (Evaluation evaluation : client.listEvaluations(parent).iterateAll()) {
        System.out.printf("Evaluation Name: %s%n", evaluation.getName());
        System.out.printf("Create Time: %s%n", evaluation.getCreateTime());
      }
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_evaluations_list]
