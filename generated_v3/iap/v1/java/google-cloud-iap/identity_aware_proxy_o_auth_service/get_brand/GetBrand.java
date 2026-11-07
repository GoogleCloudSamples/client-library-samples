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

package com.google.cloud.iap.v1;

// [START iap_v1_identityawareproxyoauthservice_brand_get]
import com.google.cloud.iap.v1.Brand;
import com.google.cloud.iap.v1.GetBrandRequest;
import com.google.cloud.iap.v1.IdentityAwareProxyOAuthServiceClient;
import java.io.IOException;

public class GetBrand {

  public static void main(String[] args) throws IOException {
    String brandId = "example-brand-id";
    String projectId = "example-project-id";
    getBrand(brandId, projectId);
  }

  public static void getBrand(String brandId, String projectId) throws IOException {
    try (IdentityAwareProxyOAuthServiceClient client = IdentityAwareProxyOAuthServiceClient.create()) {
      String name = String.format("projects/%s/brands/%s", projectId, brandId);
      GetBrandRequest request = GetBrandRequest.newBuilder().setName(name).build();
      Brand brand = client.getBrand(request);

      System.out.println("Brand name: " + brand.getName());
      System.out.println("Support email: " + brand.getSupportEmail());
      System.out.println("Application title: " + brand.getApplicationTitle());
    }
  }
}
// [END iap_v1_identityawareproxyoauthservice_brand_get]
