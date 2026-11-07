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

// [START dialogflow_v3_agents_export_agent]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// exportAgent exports the specified Dialogflow CX agent.
func exportAgent(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewAgentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAgentsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ExportAgentRequest{
		Name:       name,
		DataFormat: cxpb.ExportAgentRequest_BLOB,
	}

	op, err := client.ExportAgent(ctx, req)
	if err != nil {
		return fmt.Errorf("ExportAgent: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	content := resp.GetAgentContent()
	fmt.Fprintf(w, "Exported agent %s (%d bytes)\n", name, len(content))

	return nil
}

// [END dialogflow_v3_agents_export_agent]
