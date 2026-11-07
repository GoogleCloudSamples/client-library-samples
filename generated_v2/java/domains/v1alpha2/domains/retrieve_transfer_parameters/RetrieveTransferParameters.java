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

package com.google.cloud.domains.v1alpha2;

// [START domains_v1alpha2_domains_retrieve_transfer_parameters]
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.domains.v1alpha2.DomainsClient;
import com.google.cloud.domains.v1alpha2.RetrieveTransferParametersRequest;
import com.google.cloud.domains.v1alpha2.RetrieveTransferParametersResponse;
import com.google.cloud.domains.v1alpha2.TransferParameters;
import java.io.IOException;

public class RetrieveTransferParameters {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String domainName = "example-domain.com";
    retrieveTransferParameters(projectId, locationId, domainName);
  }

  public static void retrieveTransferParameters(
      String projectId, String locationId, String domainName) throws IOException {
    try (DomainsClient client = DomainsClient.create()) {
      String location = String.format("projects/%s/locations/%s", projectId, locationId);

      RetrieveTransferParametersRequest request =
          RetrieveTransferParametersRequest.newBuilder()
              .setLocation(location)
              .setDomainName(domainName)
              .build();

      try {
        RetrieveTransferParametersResponse response = client.retrieveTransferParameters(request);
        TransferParameters transferParameters = response.getTransferParameters();

        System.out.println("Domain Name: " + transferParameters.getDomainName());
        System.out.println("Current Registrar: " + transferParameters.getCurrentRegistrar());
        System.out.println("Transfer Lock State: " + transferParameters.getTransferLockState());
      } catch (FailedPreconditionException e) {
        System.out.println("Domain transfer operation is deprecated and no longer supported.");
      }
    }
  }
}
// [END domains_v1alpha2_domains_retrieve_transfer_parameters]
