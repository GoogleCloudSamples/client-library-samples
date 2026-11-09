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

// [START dialogflow_v3beta1_flows_flows_list]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listFlows lists the flows for a specified Dialogflow CX agent.
func listFlows(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	endpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	if locationID == "global" {
		endpoint = "dialogflow.googleapis.com:443"
	}

	client, err := dialogflow.NewFlowsClient(ctx,
		option.WithEndpoint(endpoint),
		option.WithQuotaProject(projectID),
	)
	if err != nil {
		return fmt.Errorf("NewFlowsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ListFlowsRequest{
		Parent: parent,
	}

	it := client.ListFlows(ctx, req)
	for {
		flow, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}
		fmt.Fprintf(w, "Flow: %s (Name: %s)\n", flow.GetDisplayName(), flow.GetName())
	}

	return nil
}

// [END dialogflow_v3beta1_flows_flows_list]
