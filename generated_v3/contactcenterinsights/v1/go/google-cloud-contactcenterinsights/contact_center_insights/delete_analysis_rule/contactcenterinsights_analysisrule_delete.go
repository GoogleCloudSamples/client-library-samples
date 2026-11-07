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

package main

// [START contactcenterinsights_v1_contactcenterinsights_analysisrule_delete]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// deleteAnalysisRule deletes an existing analysis rule.
func deleteAnalysisRule(ctx context.Context, w io.Writer, projectID string, locationID string, analysisRuleID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/analysisRules/%s", projectID, locationID, analysisRuleID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.DeleteAnalysisRuleRequest{
		Name: name,
	}

	if err := client.DeleteAnalysisRule(ctx, req); err != nil {
		return fmt.Errorf("DeleteAnalysisRule failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted analysis rule: %s\n", name)
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_analysisrule_delete]
