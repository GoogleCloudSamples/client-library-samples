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

package com.google.cloud.webrisk.v1;

// [START webrisk_v1_webriskservice_compute_threat_list_diff]
import com.google.cloud.webrisk.v1.WebRiskServiceClient;
import com.google.webrisk.v1.CompressionType;
import com.google.webrisk.v1.ComputeThreatListDiffRequest;
import com.google.webrisk.v1.ComputeThreatListDiffResponse;
import com.google.webrisk.v1.ThreatType;
import java.io.IOException;

public class ComputeThreatListDiff {

  public static void main(String[] args) throws Exception {
    computeThreatListDiff();
  }

  public static void computeThreatListDiff() throws Exception {
    // Initialize client that will be automatically closed at the end of the try block.
    try (WebRiskServiceClient client = WebRiskServiceClient.create()) {
      ThreatType threatType = ThreatType.MALWARE;
      ComputeThreatListDiffRequest.Constraints constraints =
          ComputeThreatListDiffRequest.Constraints.newBuilder()
              .addSupportedCompressions(CompressionType.RAW)
              .build();

      ComputeThreatListDiffRequest request =
          ComputeThreatListDiffRequest.newBuilder()
              .setThreatType(threatType)
              .setConstraints(constraints)
              .build();

      ComputeThreatListDiffResponse response = client.computeThreatListDiff(request);
      System.out.printf("Response type: %s%n", response.getResponseType());
    }
  }
}
// [END webrisk_v1_webriskservice_compute_threat_list_diff]
