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

// [START speech_v1p1beta1_adaptation_customclass_update]
import com.google.cloud.speech.v1p1beta1.AdaptationClient;
import com.google.cloud.speech.v1p1beta1.CustomClass;
import com.google.cloud.speech.v1p1beta1.CustomClassName;
import com.google.protobuf.FieldMask;

public class UpdateCustomClass {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String customClassId = "example-custom-class-id";
    updateCustomClass(projectId, locationId, customClassId);
  }

  public static void updateCustomClass(String projectId, String locationId, String customClassId)
      throws Exception {
    try (AdaptationClient client = AdaptationClient.create()) {
      CustomClass customClass =
          CustomClass.newBuilder()
              .setName(CustomClassName.of(projectId, locationId, customClassId).toString())
              .addItems(CustomClass.ClassItem.newBuilder().setValue("example-item").build())
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("items").build();

      CustomClass response = client.updateCustomClass(customClass, updateMask);
      System.out.println("Updated custom class: " + response.getName());
    }
  }
}
// [END speech_v1p1beta1_adaptation_customclass_update]
