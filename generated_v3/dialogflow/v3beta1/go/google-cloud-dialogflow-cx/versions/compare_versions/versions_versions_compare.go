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

// [START dialogflow_v3beta1_versions_compare_versions]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	"cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// compareVersions compares two versions of a Dialogflow CX flow.
func compareVersions(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string, versionID string, targetVersionID string) error {
	baseVersion := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s/versions/%s", projectID, locationID, agentID, flowID, versionID)
	targetVersion := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s/versions/%s", projectID, locationID, agentID, flowID, targetVersionID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewVersionsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewVersionsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.CompareVersionsRequest{
		BaseVersion:   baseVersion,
		TargetVersion: targetVersion,
	}

	resp, err := client.CompareVersions(ctx, req)
	if err != nil {
		return fmt.Errorf("CompareVersions: %w", err)
	}

	fmt.Fprintf(w, "Base version differences: %s\n", resp.GetBaseVersionContentJson())
	fmt.Fprintf(w, "Target version differences: %s\n", resp.GetTargetVersionContentJson())
	if resp.GetCompareTime() != nil {
		fmt.Fprintf(w, "Comparison timestamp: %s\n", resp.GetCompareTime().AsTime())
	}

	return nil
}

// [END dialogflow_v3beta1_versions_compare_versions]
