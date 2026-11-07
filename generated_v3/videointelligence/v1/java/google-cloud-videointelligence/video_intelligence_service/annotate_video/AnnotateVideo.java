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

package com.google.cloud.videointelligence.v1;

// [START videointelligence_v1_videointelligenceservice_annotate_video]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.videointelligence.v1.AnnotateVideoProgress;
import com.google.cloud.videointelligence.v1.AnnotateVideoRequest;
import com.google.cloud.videointelligence.v1.AnnotateVideoResponse;
import com.google.cloud.videointelligence.v1.Feature;
import com.google.cloud.videointelligence.v1.LabelAnnotation;
import com.google.cloud.videointelligence.v1.VideoAnnotationResults;
import com.google.cloud.videointelligence.v1.VideoIntelligenceServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AnnotateVideo {

  public static void main(String[] args) throws Exception {
    String inputUri = "gs://cloud-samples-data/video/cat.mp4";
    annotateVideo(inputUri);
  }

  public static void annotateVideo(String inputUri) throws Exception {
    try (VideoIntelligenceServiceClient client = VideoIntelligenceServiceClient.create()) {
      Feature features = Feature.LABEL_DETECTION;

      AnnotateVideoRequest request =
          AnnotateVideoRequest.newBuilder()
              .setInputUri(inputUri)
              .addFeatures(features)
              .build();

      OperationFuture<AnnotateVideoResponse, AnnotateVideoProgress> future =
          client.annotateVideoAsync(request);

      // Wait for the long-running operation to complete
      AnnotateVideoResponse response = future.get(10, TimeUnit.MINUTES);

      for (VideoAnnotationResults result : response.getAnnotationResultsList()) {
        for (LabelAnnotation annotation : result.getSegmentLabelAnnotationsList()) {
          System.out.printf("Label: %s%n", annotation.getEntity().getDescription());
        }
      }
    }
  }
}
// [END videointelligence_v1_videointelligenceservice_annotate_video]
