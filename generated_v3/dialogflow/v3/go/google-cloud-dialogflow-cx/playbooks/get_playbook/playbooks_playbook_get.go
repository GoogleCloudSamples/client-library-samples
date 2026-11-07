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

// [START dialogflow_v3_playbooks_playbook_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// getPlaybook retrieves an existing Dialogflow CX playbook.
func getPlaybook(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, playbookID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/playbooks/%s", projectID, locationID, agentID, playbookID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewPlaybooksClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewPlaybooksClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetPlaybookRequest{
		Name: name,
	}

	playbook, err := client.GetPlaybook(ctx, req)
	if err != nil {
		return fmt.Errorf("GetPlaybook failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved playbook: %s\n", playbook.GetName())
	fmt.Fprintf(w, "Display name: %s\n", playbook.GetDisplayName())
	fmt.Fprintf(w, "Goal: %s\n", playbook.GetGoal())

	return nil
}

// [END dialogflow_v3_playbooks_playbook_get]
