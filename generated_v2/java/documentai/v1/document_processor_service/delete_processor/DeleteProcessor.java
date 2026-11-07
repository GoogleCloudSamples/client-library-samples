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

// [START documentai_v1_documentprocessorservice_processor_delete]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.documentai.v1.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1.ProcessorName;
import com.google.protobuf.Empty;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteProcessor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String processorId = "example-processor_id";
    deleteProcessor(projectId, locationId, processorId);
  }

  public static void deleteProcessor(String projectId, String locationId, String processorId)
      throws Exception {
    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create()) {
      String name = ProcessorName.of(projectId, locationId, processorId).toString();

      // DeleteProcessor is a long-running operation.
      OperationFuture<Empty, DeleteProcessorMetadata> operation = client.deleteProcessorAsync(name);
      operation.get(5, TimeUnit.MINUTES);

      System.out.printf("Processor deleted successfully: %s%n", name);
    }
  }
}
// [END documentai_v1_documentprocessorservice_processor_delete]
