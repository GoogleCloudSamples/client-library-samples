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

// [START documentai_v1beta3_documentprocessorservice_review_document]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.documentai.v1beta3.Document;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceClient;
import com.google.cloud.documentai.v1beta3.DocumentProcessorServiceSettings;
import com.google.cloud.documentai.v1beta3.HumanReviewConfigName;
import com.google.cloud.documentai.v1beta3.ReviewDocumentRequest;
import com.google.cloud.documentai.v1beta3.ReviewDocumentResponse;
import com.google.protobuf.ByteString;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ReviewDocument {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String processorId = "example-processor-id";
    reviewDocument(projectId, locationId, processorId);
  }

  public static void reviewDocument(String projectId, String locationId, String processorId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String endpoint = String.format("%s-documentai.googleapis.com:443", locationId);
    DocumentProcessorServiceSettings settings =
        DocumentProcessorServiceSettings.newBuilder().setEndpoint(endpoint).build();

    try (DocumentProcessorServiceClient client = DocumentProcessorServiceClient.create(settings)) {
      String humanReviewConfig =
          HumanReviewConfigName.of(projectId, locationId, processorId).toString();
      Document inlineDocument =
          Document.newBuilder()
              .setMimeType("application/pdf")
              .setContent(ByteString.copyFromUtf8("example-content"))
              .build();

      ReviewDocumentRequest request =
          ReviewDocumentRequest.newBuilder()
              .setHumanReviewConfig(humanReviewConfig)
              .setInlineDocument(inlineDocument)
              .build();

      try {
        ReviewDocumentResponse response =
            client.reviewDocumentAsync(request).get(10, TimeUnit.MINUTES);

        System.out.println("Review completed successfully.");
        System.out.println("GCS destination: " + response.getGcsDestination());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException) {
          System.out.println("Human review is not enabled for processor: " + processorId);
        } else {
          throw e;
        }
      } catch (FailedPreconditionException e) {
        System.out.println("Human review is not enabled for processor: " + processorId);
      }
    }
  }
}
// [END documentai_v1beta3_documentprocessorservice_review_document]
