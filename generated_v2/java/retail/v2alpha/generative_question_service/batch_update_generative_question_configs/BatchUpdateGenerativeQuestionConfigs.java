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

package com.google.cloud.retail.v2alpha;

// [START retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class BatchUpdateGenerativeQuestionConfigs {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String catalogId = "default_catalog";
    batchUpdateGenerativeQuestionConfigs(projectId, locationId, catalogId);
  }

  public static void batchUpdateGenerativeQuestionConfigs(
      String projectId, String locationId, String catalogId) throws IOException {
    try (GenerativeQuestionServiceClient client = GenerativeQuestionServiceClient.create()) {
      String parent = CatalogName.of(projectId, locationId, catalogId).toString();

      GenerativeQuestionConfig generativeQuestionConfig =
          GenerativeQuestionConfig.newBuilder()
              .setCatalog(parent)
              .setFacet("brand")
              .setAllowedInConversation(true)
              .build();

      UpdateGenerativeQuestionConfigRequest updateRequest =
          UpdateGenerativeQuestionConfigRequest.newBuilder()
              .setGenerativeQuestionConfig(generativeQuestionConfig)
              .setUpdateMask(FieldMask.newBuilder().addPaths("allowed_in_conversation").build())
              .build();

      List<UpdateGenerativeQuestionConfigRequest> requests =
          Collections.singletonList(updateRequest);

      BatchUpdateGenerativeQuestionConfigsRequest request =
          BatchUpdateGenerativeQuestionConfigsRequest.newBuilder()
              .setParent(parent)
              .addAllRequests(requests)
              .build();

      try {
        BatchUpdateGenerativeQuestionConfigsResponse response =
            client.batchUpdateGenerativeQuestionConfigs(request);

        for (GenerativeQuestionConfig config : response.getGenerativeQuestionConfigsList()) {
          System.out.println("Updated question config for facet: " + config.getFacet());
          System.out.println("Allowed in conversation: " + config.getAllowedInConversation());
        }
      } catch (FailedPreconditionException e) {
        System.out.println("Cloud Retail terms are not accepted for project: " + projectId);
      }
    }
  }
}
// [END retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
