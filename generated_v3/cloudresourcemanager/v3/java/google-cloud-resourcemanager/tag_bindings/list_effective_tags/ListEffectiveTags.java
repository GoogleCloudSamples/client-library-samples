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

package com.google.cloud.cloudresourcemanager.v3;

// [START cloudresourcemanager_v3_tagbindings_effectivetags_list]
import com.google.cloud.resourcemanager.v3.EffectiveTag;
import com.google.cloud.resourcemanager.v3.ListEffectiveTagsRequest;
import com.google.cloud.resourcemanager.v3.TagBindingsClient;
import java.io.IOException;

public class ListEffectiveTags {

  public static void main(String[] args) throws IOException {
    // Full resource name of the resource to evaluate effective tags for.
    String parent = "//cloudresourcemanager.googleapis.com/projects/example-project-id";
    listEffectiveTags(parent);
  }

  public static void listEffectiveTags(String parent) throws IOException {
    try (TagBindingsClient client = TagBindingsClient.create()) {
      ListEffectiveTagsRequest request =
          ListEffectiveTagsRequest.newBuilder()
              .setParent(parent)
              .build();

      for (EffectiveTag effectiveTag : client.listEffectiveTags(request).iterateAll()) {
        System.out.printf("Tag value: %s%n", effectiveTag.getTagValue());
        System.out.printf("Namespaced tag value: %s%n", effectiveTag.getNamespacedTagValue());
        System.out.printf("Inherited: %b%n", effectiveTag.getInherited());
      }
    }
  }
}
// [END cloudresourcemanager_v3_tagbindings_effectivetags_list]
