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

// [START webrisk_v1_webriskservice_hashes_search]
import com.google.cloud.webrisk.v1.WebRiskServiceClient;
import com.google.protobuf.ByteString;
import com.google.webrisk.v1.SearchHashesResponse;
import com.google.webrisk.v1.ThreatType;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

public class SearchHashes {

  public static void main(String[] args) throws IOException {
    // Provide a hash prefix consisting of 4 to 32 bytes of a SHA-256 hash.
    byte[] hashPrefix = "example-hash_prefix".getBytes(StandardCharsets.UTF_8);
    searchHashes(hashPrefix);
  }

  public static void searchHashes(byte[] hashPrefix) throws IOException {
    // Initialize client with Application Default Credentials.
    try (WebRiskServiceClient client = WebRiskServiceClient.create()) {
      List<ThreatType> threatTypes =
          Arrays.asList(ThreatType.MALWARE, ThreatType.SOCIAL_ENGINEERING);

      SearchHashesResponse response =
          client.searchHashes(ByteString.copyFrom(hashPrefix), threatTypes);

      System.out.println("Threat matches found: " + response.getThreatsCount());
      for (SearchHashesResponse.ThreatHash threatHash : response.getThreatsList()) {
        System.out.println("Threat types: " + threatHash.getThreatTypesList());
        System.out.println("Hash: " + threatHash.getHash().toStringUtf8());
      }
    }
  }

  // Overload to support String input from runner entrypoints.
  public static void searchHashes(String hashPrefix) throws IOException {
    searchHashes(hashPrefix.getBytes(StandardCharsets.UTF_8));
  }
}
// [END webrisk_v1_webriskservice_hashes_search]
