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

// [START vision_v1p4beta1_imageannotator_batch_annotate_files]
import com.google.cloud.vision.v1p4beta1.AnnotateFileRequest;
import com.google.cloud.vision.v1p4beta1.AnnotateFileResponse;
import com.google.cloud.vision.v1p4beta1.AnnotateImageResponse;
import com.google.cloud.vision.v1p4beta1.BatchAnnotateFilesResponse;
import com.google.cloud.vision.v1p4beta1.Feature;
import com.google.cloud.vision.v1p4beta1.GcsSource;
import com.google.cloud.vision.v1p4beta1.ImageAnnotatorClient;
import com.google.cloud.vision.v1p4beta1.InputConfig;
import java.util.Collections;
import java.util.List;

public class BatchAnnotateFiles {

  public static void main(String[] args) throws Exception {
    batchAnnotateFiles();
  }

  public static void batchAnnotateFiles() throws Exception {
    // Initialize the client with Application Default Credentials
    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      GcsSource gcsSource =
          GcsSource.newBuilder()
              .setUri("gs://cloud-samples-data/vision/document_understanding/kafka.pdf")
              .build();

      InputConfig inputConfig =
          InputConfig.newBuilder()
              .setMimeType("application/pdf")
              .setGcsSource(gcsSource)
              .build();

      Feature feature =
          Feature.newBuilder()
              .setType(Feature.Type.DOCUMENT_TEXT_DETECTION)
              .build();

      AnnotateFileRequest fileRequest =
          AnnotateFileRequest.newBuilder()
              .setInputConfig(inputConfig)
              .addFeatures(feature)
              .addPages(1)
              .build();

      // The API accepts a single AnnotateFileRequest in the batch
      List<AnnotateFileRequest> requests = Collections.singletonList(fileRequest);

      BatchAnnotateFilesResponse response = client.batchAnnotateFiles(requests);
      for (AnnotateFileResponse fileResponse : response.getResponsesList()) {
        System.out.printf("Total pages: %d%n", fileResponse.getTotalPages());
        for (AnnotateImageResponse pageResponse : fileResponse.getResponsesList()) {
          System.out.printf("Page full text: %s%n", pageResponse.getFullTextAnnotation().getText());
        }
      }
    }
  }
}
// [END vision_v1p4beta1_imageannotator_batch_annotate_files]
