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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_get]
import com.google.cloud.resourcemanager.v3.TagValue;
import com.google.cloud.resourcemanager.v3.TagValuesClient;
import java.io.IOException;

public class GetTagValue {

  public static void main(String[] args) throws IOException {
    String tagValueId = "example-tag-value-id";
    getTagValue(tagValueId);
  }

  public static void getTagValue(String tagValueId) throws IOException {
    try (TagValuesClient client = TagValuesClient.create()) {
      String name = "tagValues/" + tagValueId;
      TagValue tagValue = client.getTagValue(name);

      System.out.println("TagValue: " + tagValue.getName());
      System.out.println("Short name: " + tagValue.getShortName());
      System.out.println("Parent: " + tagValue.getParent());
    }
  }
}
// [END cloudresourcemanager_v3_tagvalues_tagvalue_get]
