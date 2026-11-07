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

package com.google.cloud.webrisk.v1beta1;

// [START webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
import com.google.cloud.webrisk.v1beta1.WebRiskServiceV1Beta1Client;
import com.google.webrisk.v1beta1.CompressionType;
import com.google.webrisk.v1beta1.ComputeThreatListDiffRequest;
import com.google.webrisk.v1beta1.ComputeThreatListDiffResponse;
import com.google.webrisk.v1beta1.ThreatType;

public class ComputeThreatListDiff {

  public static void main(String[] args) throws Exception {
    computeThreatListDiff();
  }

  public static void computeThreatListDiff() throws Exception {
    // Initialize the client using Application Default Credentials.
    try (WebRiskServiceV1Beta1Client client = WebRiskServiceV1Beta1Client.create()) {
      ThreatType threatType = ThreatType.MALWARE;
      ComputeThreatListDiffRequest.Constraints constraints =
          ComputeThreatListDiffRequest.Constraints.newBuilder()
              .addSupportedCompressions(CompressionType.RAW)
              .setMaxDiffEntries(1024)
              .setMaxDatabaseEntries(2048)
              .build();

      ComputeThreatListDiffRequest request =
          ComputeThreatListDiffRequest.newBuilder()
              .setThreatType(threatType)
              .setConstraints(constraints)
              .build();

      ComputeThreatListDiffResponse response = client.computeThreatListDiff(request);
      System.out.printf("Diff response type: %s%n", response.getResponseType());
    }
  }
}
// [END webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
