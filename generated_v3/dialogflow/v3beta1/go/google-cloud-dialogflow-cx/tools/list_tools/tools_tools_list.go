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

// [START dialogflow_v3beta1_tools_tools_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	"cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listTools lists all tools for a Dialogflow CX agent.
func listTools(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	opts := []option.ClientOption{
		option.WithQuotaProject(projectID),
	}
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewToolsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewToolsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ListToolsRequest{
		Parent: parent,
	}

	it := client.ListTools(ctx, req)
	for {
		tool, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Tool: %s (%s)\n", tool.GetName(), tool.GetDisplayName())
	}

	return nil
}

// [END dialogflow_v3beta1_tools_tools_list]
