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

// [START dialogflow_v3_deployments_deployments_list]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listDeployments lists all deployments for a specified environment in a Dialogflow CX agent.
func listDeployments(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s", projectID, locationID, agentID, environmentID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewDeploymentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewDeploymentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ListDeploymentsRequest{
		Parent: parent,
	}

	it := client.ListDeployments(ctx, req)
	count := 0
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate deployments: %w", err)
		}
		fmt.Fprintf(w, "Deployment: %s, State: %s\n", resp.GetName(), resp.GetState())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No deployments found.")
	}

	return nil
}

// [END dialogflow_v3_deployments_deployments_list]
