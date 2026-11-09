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

package com.google.cloud.videointelligence.v1p2beta1;

// [START videointelligence_v1p2beta1_videointelligenceservice_annotate_video]
import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.videointelligence.v1p2beta1.AnnotateVideoProgress;
import com.google.cloud.videointelligence.v1p2beta1.AnnotateVideoResponse;
import com.google.cloud.videointelligence.v1p2beta1.Feature;
import com.google.cloud.videointelligence.v1p2beta1.LabelAnnotation;
import com.google.cloud.videointelligence.v1p2beta1.VideoAnnotationResults;
import com.google.cloud.videointelligence.v1p2beta1.VideoIntelligenceServiceClient;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class AnnotateVideo {

  public static void main(String[] args) throws Exception {
    String inputUri = "gs://example-bucket-id/example-object-id";
    annotateVideo(inputUri);
  }

  public static void annotateVideo(String inputUri) throws Exception {
    try (VideoIntelligenceServiceClient client = VideoIntelligenceServiceClient.create()) {
      List<Feature> features = Arrays.asList(Feature.LABEL_DETECTION);

      OperationFuture<AnnotateVideoResponse, AnnotateVideoProgress> future =
          client.annotateVideoAsync(inputUri, features);

      System.out.println("Waiting for the operation to complete...");
      AnnotateVideoResponse response = future.get(10, TimeUnit.MINUTES);

      for (VideoAnnotationResults results : response.getAnnotationResultsList()) {
        for (LabelAnnotation labelAnnotation : results.getSegmentLabelAnnotationsList()) {
          System.out.println("Label description: " + labelAnnotation.getEntity().getDescription());
        }
      }
    }
  }
}
// [END videointelligence_v1p2beta1_videointelligenceservice_annotate_video]
