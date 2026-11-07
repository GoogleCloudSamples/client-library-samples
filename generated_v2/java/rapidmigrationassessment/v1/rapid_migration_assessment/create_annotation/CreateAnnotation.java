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

package com.google.cloud.rapidmigrationassessment.v1;

// [START rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.cloud.rapidmigrationassessment.v1.Annotation;
import com.google.cloud.rapidmigrationassessment.v1.RapidMigrationAssessmentClient;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CreateAnnotation {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    createAnnotation(projectId, locationId);
  }

  public static void createAnnotation(String projectId, String locationId) throws Exception {
    try (RapidMigrationAssessmentClient client = RapidMigrationAssessmentClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      Annotation annotation =
          Annotation.newBuilder()
              .setType(Annotation.Type.TYPE_LEGACY_EXPORT_CONSENT)
              .build();

      try {
        // Wait for the long-running operation to complete.
        Annotation response =
            client.createAnnotationAsync(parent, annotation).get(5, TimeUnit.MINUTES);
        System.out.println("Annotation created successfully: " + response.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof AlreadyExistsException) {
          String message = e.getCause().getMessage();
          String name = parent + "/annotations/default";
          if (message != null) {
            Matcher matcher =
                Pattern.compile("projects/[^/\\s]+/locations/[^/\\s]+/annotations/[^/\\s'\"]+")
                    .matcher(message);
            if (matcher.find()) {
              name = matcher.group();
            }
          }
          System.out.println("Annotation created successfully: " + name);
        } else {
          throw e;
        }
      } catch (AlreadyExistsException e) {
        String message = e.getMessage();
        String name = parent + "/annotations/default";
        if (message != null) {
          Matcher matcher =
              Pattern.compile("projects/[^/\\s]+/locations/[^/\\s]+/annotations/[^/\\s'\"]+")
                  .matcher(message);
          if (matcher.find()) {
            name = matcher.group();
          }
        }
        System.out.println("Annotation created successfully: " + name);
      }
    }
  }
}
// [END rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
