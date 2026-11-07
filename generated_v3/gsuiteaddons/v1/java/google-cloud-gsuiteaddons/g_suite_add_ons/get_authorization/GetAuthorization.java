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

package com.google.cloud.gsuiteaddons.v1;

// [START gsuiteaddons_v1_gsuiteaddons_authorization_get]
import com.google.cloud.gsuiteaddons.v1.Authorization;
import com.google.cloud.gsuiteaddons.v1.AuthorizationName;
import com.google.cloud.gsuiteaddons.v1.GSuiteAddOnsClient;

public class GetAuthorization {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    getAuthorization(projectId);
  }

  public static void getAuthorization(String projectId) throws Exception {
    try (GSuiteAddOnsClient client = GSuiteAddOnsClient.create()) {
      String name = AuthorizationName.of(projectId).toString();
      Authorization response = client.getAuthorization(name);
      System.out.println("Authorization retrieved: " + response.getName());
    }
  }
}
// [END gsuiteaddons_v1_gsuiteaddons_authorization_get]
