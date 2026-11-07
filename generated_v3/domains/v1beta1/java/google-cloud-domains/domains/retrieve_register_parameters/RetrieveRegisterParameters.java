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

package com.google.cloud.domains.v1beta1;

// [START domains_v1beta1_domains_retrieve_register_parameters]
import com.google.cloud.domains.v1beta1.DomainsClient;
import com.google.cloud.domains.v1beta1.RegisterParameters;
import com.google.cloud.domains.v1beta1.RetrieveRegisterParametersResponse;
import com.google.type.Money;
import java.io.IOException;

public class RetrieveRegisterParameters {

  public static void main(String[] args) throws IOException {
    String projectId =
        args.length > 0
            ? args[0]
            : System.getenv().getOrDefault("GOOGLE_CLOUD_PROJECT", "example-project-id");
    String locationId = args.length > 1 ? args[1] : "global";
    String domainName = args.length > 2 ? args[2] : "example.com";
    retrieveRegisterParameters(projectId, locationId, domainName);
  }

  public static void retrieveRegisterParameters(
      String projectId, String locationId, String domainName) throws IOException {
    try (DomainsClient client = DomainsClient.create()) {
      String location = String.format("projects/%s/locations/%s", projectId, locationId);

      RetrieveRegisterParametersResponse response =
          client.retrieveRegisterParameters(location, domainName);

      RegisterParameters registerParameters = response.getRegisterParameters();
      System.out.println("Domain Name: " + registerParameters.getDomainName());
      System.out.println(
          "Availability: "
              + (registerParameters.getAvailability() == RegisterParameters.Availability.AVAILABLE
                  ? "Available"
                  : "Not available"));
      if (registerParameters.hasYearlyPrice()) {
        Money yearlyPrice = registerParameters.getYearlyPrice();
        System.out.printf(
            "Yearly Price: %d %s%n", yearlyPrice.getUnits(), yearlyPrice.getCurrencyCode());
      }
    }
  }
}
// [END domains_v1beta1_domains_retrieve_register_parameters]
