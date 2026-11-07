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

// [START cloudresourcemanager_v3_tagbindings_tagbindings_list]
import com.google.cloud.resourcemanager.v3.ListTagBindingsRequest;
import com.google.cloud.resourcemanager.v3.TagBinding;
import com.google.cloud.resourcemanager.v3.TagBindingsClient;
import java.io.IOException;

public class ListTagBindings {

  public static void main(String[] args) throws IOException {
    // Specify the full resource name of an existing Google Cloud resource.
    String parent = "//cloudresourcemanager.googleapis.com/projects/example-project-id";
    listTagBindings(parent);
  }

  public static void listTagBindings(String parent) throws IOException {
    // Initialize the client that sends requests.
    try (TagBindingsClient client = TagBindingsClient.create()) {
      ListTagBindingsRequest request =
          ListTagBindingsRequest.newBuilder().setParent(parent).build();

      for (TagBinding tagBinding : client.listTagBindings(request).iterateAll()) {
        System.out.printf("Tag binding: %s%n", tagBinding.getName());
        System.out.printf("Tag value: %s%n", tagBinding.getTagValue());
        System.out.printf("Resource: %s%n", tagBinding.getParent());
      }
      System.out.println("Listed tag bindings successfully.");
    }
  }
}
// [END cloudresourcemanager_v3_tagbindings_tagbindings_list]
