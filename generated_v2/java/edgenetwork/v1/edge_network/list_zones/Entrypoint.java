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

package com.google.cloud.edgenetwork.v1;

public class Entrypoint {
  public static void main(String[] args) throws Exception {
    // Support environment variables with optional CLI argument fallbacks
    String projectId = getParam(args, 0, "PROJECT_ID");
    String locationId = getParam(args, 1, "LOCATION_ID");
    ListZones.listZones(projectId, locationId);
  }

  private static String getParam(String[] args, int index, String envKey) {
    if (envKey != null && !envKey.isEmpty()) {
      String val = System.getenv(envKey);
      if (val != null && !val.isEmpty()) {
        return stripQuotes(val);
      }
    }
    if (args != null && args.length > index && args[index] != null && !args[index].isEmpty()) {
      return stripQuotes(args[index]);
    }
    return null;
  }

  private static String stripQuotes(String val) {
    if (val != null && val.length() >= 2
        && ((val.startsWith("\"") && val.endsWith("\""))
            || (val.startsWith("'") && val.endsWith("'")))) {
      return val.substring(1, val.length() - 1);
    }
    return val;
  }
}
