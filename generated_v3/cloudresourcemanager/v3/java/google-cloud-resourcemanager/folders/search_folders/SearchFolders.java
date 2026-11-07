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

// [START cloudresourcemanager_v3_folders_folders_search]
import com.google.cloud.resourcemanager.v3.Folder;
import com.google.cloud.resourcemanager.v3.FoldersClient;
import java.io.IOException;

public class SearchFolders {

  public static void main(String[] args) throws IOException {
    // Filter query string to restrict search results
    String query = "state=ACTIVE";
    searchFolders(query);
  }

  public static void searchFolders(String query) throws IOException {
    // Initialize client within try-with-resources to manage automatic cleanup
    try (FoldersClient client = FoldersClient.create()) {
      for (Folder folder : client.searchFolders(query).iterateAll()) {
        System.out.printf("Folder: %s (%s)%n", folder.getDisplayName(), folder.getName());
      }
    }
  }
}
// [END cloudresourcemanager_v3_folders_folders_search]
