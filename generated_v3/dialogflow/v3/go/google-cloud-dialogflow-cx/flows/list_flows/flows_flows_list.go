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

// [START dialogflow_v3_flows_flows_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listFlows retrieves and prints all flows associated with the specified Dialogflow CX agent.
func listFlows(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewFlowsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewFlowsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ListFlowsRequest{
		Parent: parent,
	}

	it := client.ListFlows(ctx, req)
	for {
		flow, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("listing flows: %w", err)
		}
		fmt.Fprintf(w, "Flow: %s (%s)\n", flow.GetDisplayName(), flow.GetName())
	}

	return nil
}

// [END dialogflow_v3_flows_flows_list]
