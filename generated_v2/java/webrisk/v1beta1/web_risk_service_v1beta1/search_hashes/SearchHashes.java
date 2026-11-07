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

// [START webrisk_v1beta1_webriskservicev1beta1_hashes_search]
import com.google.cloud.webrisk.v1beta1.WebRiskServiceV1Beta1Client;
import com.google.protobuf.ByteString;
import com.google.webrisk.v1beta1.SearchHashesResponse;
import com.google.webrisk.v1beta1.ThreatType;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

public class SearchHashes {

  public static void main(String[] args) throws IOException {
    byte[] hashPrefix = "example-hash_prefix".getBytes(StandardCharsets.UTF_8);
    searchHashes(hashPrefix);
  }

  public static void searchHashes(byte[] hashPrefix) throws IOException {
    try (WebRiskServiceV1Beta1Client client = WebRiskServiceV1Beta1Client.create()) {
      List<ThreatType> threatTypes =
          Arrays.asList(ThreatType.MALWARE, ThreatType.SOCIAL_ENGINEERING);

      ByteString prefix = ByteString.copyFrom(hashPrefix);
      SearchHashesResponse response = client.searchHashes(prefix, threatTypes);

      for (SearchHashesResponse.ThreatHash threat : response.getThreatsList()) {
        System.out.println("Threat types: " + threat.getThreatTypesList());
        System.out.println("Hash: " + threat.getHash().toStringUtf8());
        System.out.println("Expire time: " + threat.getExpireTime().getSeconds());
      }
      System.out.println("Completed search for matching threat hashes.");
    }
  }

  public static void searchHashes(String hashPrefix) throws IOException {
    searchHashes(hashPrefix.getBytes(StandardCharsets.UTF_8));
  }
}
// [END webrisk_v1beta1_webriskservicev1beta1_hashes_search]
