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

// [START workloadmanager_v1_workloadmanager_rules_list]

import (
	"context"
	"fmt"
	"io"

	workloadmanager "cloud.google.com/go/workloadmanager/apiv1"
	workloadmanagerpb "cloud.google.com/go/workloadmanager/apiv1/workloadmanagerpb"
)

// listRules lists evaluation rules in a given location.
func listRules(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := workloadmanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &workloadmanagerpb.ListRulesRequest{
		Parent: parent,
	}

	resp, err := client.ListRules(ctx, req)
	if err != nil {
		return fmt.Errorf("ListRules: %w", err)
	}

	for _, rule := range resp.GetRules() {
		fmt.Fprintf(w, "Rule: %s\n", rule.GetName())
	}

	return nil
}

// [END workloadmanager_v1_workloadmanager_rules_list]
