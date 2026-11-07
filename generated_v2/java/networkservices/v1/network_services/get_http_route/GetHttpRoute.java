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

package com.google.cloud.networkservices.v1;

// [START networkservices_v1_networkservices_httproute_get]
import com.google.cloud.networkservices.v1.HttpRoute;
import com.google.cloud.networkservices.v1.HttpRouteName;
import com.google.cloud.networkservices.v1.NetworkServicesClient;
import java.io.IOException;

public class GetHttpRoute {

  public static void getHttpRoute(String projectId, String locationId, String httpRouteId)
      throws IOException {
    try (NetworkServicesClient client = NetworkServicesClient.create()) {
      String name = HttpRouteName.of(projectId, locationId, httpRouteId).toString();
      HttpRoute httpRoute = client.getHttpRoute(name);
      System.out.println("Retrieved HTTP Route: " + httpRoute.getName());
    }
  }
}
// [END networkservices_v1_networkservices_httproute_get]
