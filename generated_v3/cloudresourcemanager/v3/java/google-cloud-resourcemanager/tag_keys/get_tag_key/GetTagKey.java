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

// [START cloudresourcemanager_v3_tagkeys_tagkey_get]
import com.google.cloud.resourcemanager.v3.TagKey;
import com.google.cloud.resourcemanager.v3.TagKeysClient;
import java.io.IOException;

public class GetTagKey {

  public static void main(String[] args) throws IOException {
    String tagKeyId = "example-tag-key-id";
    getTagKey(tagKeyId);
  }

  public static void getTagKey(String tagKeyId) throws IOException {
    try (TagKeysClient client = TagKeysClient.create()) {
      String name = "tagKeys/" + tagKeyId;

      TagKey tagKey = client.getTagKey(name);

      System.out.println("TagKey retrieved successfully: " + tagKey.getName());
      System.out.println("Short name: " + tagKey.getShortName());
      System.out.println("Namespaced name: " + tagKey.getNamespacedName());
    }
  }
}
// [END cloudresourcemanager_v3_tagkeys_tagkey_get]
