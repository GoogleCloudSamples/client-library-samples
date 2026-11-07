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

// [START gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.gkerecommender.v1.FetchModelServersRequest;
import com.google.cloud.gkerecommender.v1.GkeInferenceQuickstartClient;

public class FetchModelServers {

  public static void main(String[] args) throws Exception {
    // A valid model identifier in Hugging Face Hub format (owner/model_name)
    String model = "google/gemma-2-2b";
    fetchModelServers(model);
  }

  public static void fetchModelServers(String model) throws Exception {
    // Initialize client with Application Default Credentials (ADC)
    try (GkeInferenceQuickstartClient client = GkeInferenceQuickstartClient.create()) {
      FetchModelServersRequest request =
          FetchModelServersRequest.newBuilder()
              .setModel(model)
              .build();

      try {
        for (String modelServer : client.fetchModelServers(request).iterateAll()) {
          System.out.println("Model server: " + modelServer);
        }
      } catch (NotFoundException e) {
        System.out.println("No model servers found for model: " + model);
      }
    }
  }
}
// [END gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
