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

// [START dialogflow_v3beta1_testcases_calculate_coverage]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// calculateCoverage calculates coverage for test cases in an agent.
func calculateCoverage(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	var clientOpts []option.ClientOption
	if locationID != "" && locationID != "global" {
		clientOpts = append(clientOpts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		clientOpts = append(clientOpts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewTestCasesClient(ctx, clientOpts...)
	if err != nil {
		return fmt.Errorf("NewTestCasesClient failed: %w", err)
	}
	defer client.Close()

	agent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)
	coverageType := cxpb.CalculateCoverageRequest_INTENT

	req := &cxpb.CalculateCoverageRequest{
		Agent: agent,
		Type:  coverageType,
	}

	resp, err := client.CalculateCoverage(ctx, req)
	if err != nil {
		return fmt.Errorf("CalculateCoverage failed: %w", err)
	}

	fmt.Fprintf(w, "Coverage calculated for agent: %s\n", resp.GetAgent())
	if intentCoverage := resp.GetIntentCoverage(); intentCoverage != nil {
		fmt.Fprintf(w, "Intent coverage score: %f\n", intentCoverage.GetCoverageScore())
	}

	return nil
}

// [END dialogflow_v3beta1_testcases_calculate_coverage]
