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

package com.google.cloud.gkerecommender.v1;

// [START gkerecommender_v1_gkeinferencequickstart_fetch_model_server_versions]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.gkerecommender.v1.FetchModelServerVersionsRequest;
import com.google.cloud.gkerecommender.v1.GkeInferenceQuickstartClient;
import com.google.cloud.gkerecommender.v1.GkeInferenceQuickstartClient.FetchModelServerVersionsPagedResponse;
import java.io.IOException;

public class FetchModelServerVersions {

  public static void main(String[] args) throws IOException {
    String model = "google/gemma-2b";
    String modelServer = "vllm";
    fetchModelServerVersions(model, modelServer);
  }

  public static void fetchModelServerVersions(String model, String modelServer) throws IOException {
    try (GkeInferenceQuickstartClient client = GkeInferenceQuickstartClient.create()) {
      FetchModelServerVersionsRequest request =
          FetchModelServerVersionsRequest.newBuilder()
              .setModel(model)
              .setModelServer(modelServer)
              .build();

      try {
        FetchModelServerVersionsPagedResponse response = client.fetchModelServerVersions(request);
        for (String version : response.iterateAll()) {
          System.out.println("Model server version: " + version);
        }
      } catch (NotFoundException e) {
        System.out.println(
            "No model server versions found for model: " + model + ", model server: " + modelServer);
      }
    }
  }
}
// [END gkerecommender_v1_gkeinferencequickstart_fetch_model_server_versions]
