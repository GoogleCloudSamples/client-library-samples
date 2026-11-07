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

package com.google.cloud.translate.v3;

// [START translate_v3_translationservice_glossary_delete]
import com.google.cloud.translate.v3.DeleteGlossaryResponse;
import com.google.cloud.translate.v3.GlossaryName;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class DeleteGlossary {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String glossaryId = "example-glossary_id";
    deleteGlossary(projectId, locationId, glossaryId);
  }

  public static void deleteGlossary(String projectId, String locationId, String glossaryId)
      throws Exception {
    try (TranslationServiceClient client = TranslationServiceClient.create()) {
      String name = GlossaryName.of(projectId, locationId, glossaryId).toString();

      // Initiate glossary deletion and wait for the long-running operation to complete.
      DeleteGlossaryResponse response = client.deleteGlossaryAsync(name).get(300, TimeUnit.SECONDS);
      System.out.printf("Deleted glossary: %s%n", response.getName());
    }
  }
}
// [END translate_v3_translationservice_glossary_delete]
