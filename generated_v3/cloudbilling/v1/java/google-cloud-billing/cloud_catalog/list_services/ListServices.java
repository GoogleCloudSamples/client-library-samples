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

package com.google.cloud.cloudbilling.v1;

// [START cloudbilling_v1_cloudcatalog_services_list]
import com.google.cloud.billing.v1.CloudCatalogClient;
import com.google.cloud.billing.v1.Service;
import java.io.IOException;

public class ListServices {

  public static void main(String[] args) throws IOException {
    listServices();
  }

  public static void listServices() throws IOException {
    // Initialize the client using Application Default Credentials.
    try (CloudCatalogClient client = CloudCatalogClient.create()) {
      // List all publicly available services in the Cloud Catalog.
      for (Service service : client.listServices().iterateAll()) {
        System.out.printf("Service Name: %s%n", service.getName());
        System.out.printf("Display Name: %s%n", service.getDisplayName());
        System.out.printf("Service ID: %s%n", service.getServiceId());
      }
    }
  }
}
// [END cloudbilling_v1_cloudcatalog_services_list]
