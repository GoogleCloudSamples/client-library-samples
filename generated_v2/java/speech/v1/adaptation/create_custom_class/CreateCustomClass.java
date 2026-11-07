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

package com.google.cloud.speech.v1;

// [START speech_v1_adaptation_customclass_create]
import com.google.cloud.speech.v1.AdaptationClient;
import com.google.cloud.speech.v1.CustomClass;

public class CreateCustomClass {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "global";
    String customClassId = "example-custom-class-id";
    createCustomClass(projectId, locationId, customClassId);
  }

  public static void createCustomClass(String projectId, String locationId, String customClassId)
      throws Exception {
    try (AdaptationClient client = AdaptationClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      CustomClass customClass =
          CustomClass.newBuilder()
              .addItems(CustomClass.ClassItem.newBuilder().setValue("COMMERCIAL_FLIGHT").build())
              .build();

      CustomClass response = client.createCustomClass(parent, customClass, customClassId);
      System.out.println("Created custom class: " + response.getName());
    }
  }
}
// [END speech_v1_adaptation_customclass_create]
