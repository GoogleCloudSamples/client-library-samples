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

package com.google.cloud.contentwarehouse.v1;

// [START contentwarehouse_v1_rulesetservice_ruleset_delete]
import com.google.cloud.contentwarehouse.v1.DeleteRuleSetRequest;
import com.google.cloud.contentwarehouse.v1.RuleSetName;
import com.google.cloud.contentwarehouse.v1.RuleSetServiceClient;
import java.io.IOException;

public class DeleteRuleSet {

  public static void main(String[] args) throws Exception {
    String locationId = "example-location_id";
    String ruleSetId = "example-rule_set_id";
    String projectNumber = "example-project_number";
    deleteRuleSet(locationId, ruleSetId, projectNumber);
  }

  public static void deleteRuleSet(String locationId, String ruleSetId, String projectNumber)
      throws Exception {
    try (RuleSetServiceClient client = RuleSetServiceClient.create()) {
      String name = RuleSetName.of(projectNumber, locationId, ruleSetId).toString();
      DeleteRuleSetRequest request = DeleteRuleSetRequest.newBuilder().setName(name).build();

      client.deleteRuleSet(request);
      System.out.println("Deleted rule set: " + name);
    }
  }
}
// [END contentwarehouse_v1_rulesetservice_ruleset_delete]
