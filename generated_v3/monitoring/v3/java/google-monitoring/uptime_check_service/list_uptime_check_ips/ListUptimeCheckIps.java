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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_uptimecheckservice_uptimecheckips_list]
import com.google.cloud.monitoring.v3.UptimeCheckServiceClient;
import com.google.monitoring.v3.ListUptimeCheckIpsRequest;
import com.google.monitoring.v3.UptimeCheckIp;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ListUptimeCheckIps {

  public static void main(String[] args) throws IOException {
    listUptimeCheckIps();
  }

  public static void listUptimeCheckIps() throws IOException {
    // Suppress informational logs emitted to standard error during static initialization.
    Logger.getLogger("").setLevel(Level.WARNING);

    try (UptimeCheckServiceClient client = UptimeCheckServiceClient.create()) {
      ListUptimeCheckIpsRequest request = ListUptimeCheckIpsRequest.newBuilder().build();
      for (UptimeCheckIp uptimeCheckIp : client.listUptimeCheckIps(request).iterateAll()) {
        System.out.printf(
            "Region: %s, Location: %s, IP Address: %s%n",
            uptimeCheckIp.getRegion(), uptimeCheckIp.getLocation(), uptimeCheckIp.getIpAddress());
      }
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckips_list]
