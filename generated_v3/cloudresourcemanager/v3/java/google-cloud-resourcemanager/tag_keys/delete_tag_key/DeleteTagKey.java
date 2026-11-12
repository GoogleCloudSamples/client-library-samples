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

// [START cloudresourcemanager_v3_tagkeys_tagkey_delete]
import com.google.cloud.resourcemanager.v3.TagKey;
import com.google.cloud.resourcemanager.v3.TagKeysClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteTagKey {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String tagKeyId = "example-tag-key-id";
    deleteTagKey(tagKeyId);
  }

  public static void deleteTagKey(String tagKeyId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (TagKeysClient client = TagKeysClient.create()) {
      String name = "tagKeys/" + tagKeyId;

      // TagKey deletion is a long-running operation; wait for it to complete.
      TagKey response = client.deleteTagKeyAsync(name).get(5, TimeUnit.MINUTES);
      System.out.println("Deleted TagKey: " + response.getName());
    }
  }
}
// [END cloudresourcemanager_v3_tagkeys_tagkey_delete]
