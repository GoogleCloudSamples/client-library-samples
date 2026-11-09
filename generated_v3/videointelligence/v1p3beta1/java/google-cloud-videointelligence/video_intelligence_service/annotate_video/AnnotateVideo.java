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

package com.google.cloud.videointelligence.v1p3beta1;

// [START videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.videointelligence.v1p3beta1.AnnotateVideoProgress;
import com.google.cloud.videointelligence.v1p3beta1.AnnotateVideoRequest;
import com.google.cloud.videointelligence.v1p3beta1.AnnotateVideoResponse;
import com.google.cloud.videointelligence.v1p3beta1.Feature;
import com.google.cloud.videointelligence.v1p3beta1.VideoAnnotationResults;
import com.google.cloud.videointelligence.v1p3beta1.VideoIntelligenceServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AnnotateVideo {

  public static void main(String[] args) throws Exception {
    annotateVideo();
  }

  public static void annotateVideo() throws Exception {
    try (VideoIntelligenceServiceClient client = VideoIntelligenceServiceClient.create()) {
      Feature features = Feature.LABEL_DETECTION;
      String inputUri = "gs://cloud-samples-data/video/cat.mp4";

      AnnotateVideoRequest request =
          AnnotateVideoRequest.newBuilder()
              .setInputUri(inputUri)
              .addFeatures(features)
              .build();

      OperationFuture<AnnotateVideoResponse, AnnotateVideoProgress> future =
          client.annotateVideoAsync(request);

      System.out.println("Waiting for operation to complete...");
      AnnotateVideoResponse response = future.get(300, TimeUnit.SECONDS);

      for (VideoAnnotationResults result : response.getAnnotationResultsList()) {
        System.out.printf("Processed video: %s%n", result.getInputUri());
      }
    }
  }
}
// [END videointelligence_v1p3beta1_videointelligenceservice_annotate_video]
