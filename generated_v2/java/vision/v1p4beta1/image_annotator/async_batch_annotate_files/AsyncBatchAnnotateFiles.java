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

package com.google.cloud.vision.v1p4beta1;

// [START vision_v1p4beta1_imageannotator_async_batch_annotate_files]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.vision.v1p4beta1.AsyncAnnotateFileRequest;
import com.google.cloud.vision.v1p4beta1.AsyncAnnotateFileResponse;
import com.google.cloud.vision.v1p4beta1.AsyncBatchAnnotateFilesResponse;
import com.google.cloud.vision.v1p4beta1.Feature;
import com.google.cloud.vision.v1p4beta1.GcsDestination;
import com.google.cloud.vision.v1p4beta1.GcsSource;
import com.google.cloud.vision.v1p4beta1.ImageAnnotatorClient;
import com.google.cloud.vision.v1p4beta1.InputConfig;
import com.google.cloud.vision.v1p4beta1.OperationMetadata;
import com.google.cloud.vision.v1p4beta1.OutputConfig;
import com.google.longrunning.Operation;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AsyncBatchAnnotateFiles {

  public static void main(String[] args) throws Exception {
    String gcsSourceUri = "gs://example-bucket/path/to/document.pdf";
    String gcsDestinationUri = "gs://example-bucket/path/to/output/";
    asyncBatchAnnotateFiles(gcsSourceUri, gcsDestinationUri);
  }

  public static void asyncBatchAnnotateFiles(String gcsSourceUri, String gcsDestinationUri)
      throws Exception {
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      GcsSource gcsSource = GcsSource.newBuilder().setUri(gcsSourceUri).build();
      InputConfig inputConfig =
          InputConfig.newBuilder()
              .setMimeType("application/pdf")
              .setGcsSource(gcsSource)
              .build();

      GcsDestination gcsDestination =
          GcsDestination.newBuilder().setUri(gcsDestinationUri).build();
      OutputConfig outputConfig =
          OutputConfig.newBuilder().setGcsDestination(gcsDestination).build();

      Feature feature =
          Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();

      AsyncAnnotateFileRequest request =
          AsyncAnnotateFileRequest.newBuilder()
              .setInputConfig(inputConfig)
              .setOutputConfig(outputConfig)
              .addFeatures(feature)
              .build();

      List<AsyncAnnotateFileRequest> requests = Arrays.asList(request);

      OperationFuture<AsyncBatchAnnotateFilesResponse, OperationMetadata> future =
          client.asyncBatchAnnotateFilesAsync(requests);

      try {
        future.get(180, TimeUnit.SECONDS);
      } catch (ExecutionException e) {
        // The Cloud Vision backend packs the v1 response type into the operation payload,
        // which causes the v1p4beta1 client to encounter an unpacking exception upon completion.
      }

      Operation operation = client.getOperationsClient().getOperation(future.getName());
      if (operation.hasError()) {
        System.out.printf("Operation failed: %s%n", operation.getError().getMessage());
        return;
      }

      if (operation
          .getResponse()
          .is(com.google.cloud.vision.v1.AsyncBatchAnnotateFilesResponse.class)) {
        com.google.cloud.vision.v1.AsyncBatchAnnotateFilesResponse response =
            operation
                .getResponse()
                .unpack(com.google.cloud.vision.v1.AsyncBatchAnnotateFilesResponse.class);
        for (com.google.cloud.vision.v1.AsyncAnnotateFileResponse fileResponse
            : response.getResponsesList()) {
          System.out.printf(
              "Output written to GCS URI: %s%n",
              fileResponse.getOutputConfig().getGcsDestination().getUri());
        }
      } else if (operation.getResponse().is(AsyncBatchAnnotateFilesResponse.class)) {
        AsyncBatchAnnotateFilesResponse response =
            operation.getResponse().unpack(AsyncBatchAnnotateFilesResponse.class);
        for (AsyncAnnotateFileResponse fileResponse : response.getResponsesList()) {
          System.out.printf(
              "Output written to GCS URI: %s%n",
              fileResponse.getOutputConfig().getGcsDestination().getUri());
        }
      }
    }
  }
}
// [END vision_v1p4beta1_imageannotator_async_batch_annotate_files]
