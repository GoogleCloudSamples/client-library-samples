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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_update]
import com.google.cloud.resourcemanager.v3.TagValue;
import com.google.cloud.resourcemanager.v3.TagValuesClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateTagValue {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String tagValueId = "example-tag-value-id";
    updateTagValue(tagValueId);
  }

  public static void updateTagValue(String tagValueId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (TagValuesClient client = TagValuesClient.create()) {
      TagValue tagValue =
          TagValue.newBuilder()
              .setName("tagValues/" + tagValueId)
              .setDescription("Updated description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // TagValue updates are long-running operations that require waiting for completion.
      TagValue response = client.updateTagValueAsync(tagValue, updateMask).get(2, TimeUnit.MINUTES);
      System.out.println("Updated TagValue: " + response.getName());
    }
  }
}
// [END cloudresourcemanager_v3_tagvalues_tagvalue_update]
