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

// [START cloudresourcemanager_v3_tagvalues_tagvalue_delete]
import com.google.cloud.resourcemanager.v3.TagValue;
import com.google.cloud.resourcemanager.v3.TagValueName;
import com.google.cloud.resourcemanager.v3.TagValuesClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteTagValue {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String tagValueId = "example-tag-value-id";
    deleteTagValue(tagValueId);
  }

  public static void deleteTagValue(String tagValueId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (TagValuesClient client = TagValuesClient.create()) {
      String name = TagValueName.of(tagValueId).toString();
      // Wait for the long-running delete operation to complete.
      TagValue response = client.deleteTagValueAsync(name).get(300, TimeUnit.SECONDS);
      System.out.println("Deleted TagValue: " + response.getName());
    }
  }
}
// [END cloudresourcemanager_v3_tagvalues_tagvalue_delete]
