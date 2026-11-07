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

// [START dialogflow_v3_agents_validate_agent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// validateAgent validates the specified Dialogflow CX agent.
func validateAgent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	opts := []option.ClientOption{
		option.WithQuotaProject(projectID),
	}
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewAgentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAgentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ValidateAgentRequest{
		Name: name,
	}

	resp, err := client.ValidateAgent(ctx, req)
	if err != nil {
		return fmt.Errorf("ValidateAgent failed: %w", err)
	}

	fmt.Fprintf(w, "Agent validation result: %s\n", resp.GetName())

	return nil
}

// [END dialogflow_v3_agents_validate_agent]
