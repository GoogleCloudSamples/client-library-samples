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

package com.google.cloud.speech.v1p1beta1;

// [START speech_v1p1beta1_adaptation_customclass_create]
import com.google.cloud.speech.v1p1beta1.AdaptationClient;
import com.google.cloud.speech.v1p1beta1.CustomClass;
import com.google.cloud.speech.v1p1beta1.LocationName;
import java.io.IOException;

public class CreateCustomClass {

  public static void createCustomClass(String projectId, String locationId, String customClassId)
      throws IOException {
    try (AdaptationClient client = AdaptationClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      CustomClass customClass =
          CustomClass.newBuilder()
              .addItems(CustomClass.ClassItem.newBuilder().setValue("burrito").build())
              .addItems(CustomClass.ClassItem.newBuilder().setValue("taco").build())
              .build();

      CustomClass response = client.createCustomClass(parent, customClass, customClassId);
      System.out.println("Created custom class: " + response.getName());
    }
  }
}
// [END speech_v1p1beta1_adaptation_customclass_create]
