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

package com.google.cloud.recommender.v1beta1;

// [START recommender_v1beta1_recommender_recommenders_list]
import com.google.cloud.recommender.v1beta1.ListRecommendersRequest;
import com.google.cloud.recommender.v1beta1.RecommenderClient;
import com.google.cloud.recommender.v1beta1.RecommenderType;

public class ListRecommenders {

  public static void main(String[] args) throws Exception {
    listRecommenders();
  }

  public static void listRecommenders() throws Exception {
    try (RecommenderClient client = RecommenderClient.create()) {
      ListRecommendersRequest request = ListRecommendersRequest.newBuilder().build();
      for (RecommenderType recommender : client.listRecommenders(request).iterateAll()) {
        System.out.println("Recommender name: " + recommender.getName());
      }
    }
  }
}
// [END recommender_v1beta1_recommender_recommenders_list]
