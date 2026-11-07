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

// [START dialogflow_v3beta1_playbooks_playbook_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updatePlaybook updates an existing Dialogflow CX playbook.
func updatePlaybook(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, playbookID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewPlaybooksClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewPlaybooksClient failed: %w", err)
	}
	defer client.Close()

	playbook := &cxpb.Playbook{
		Name:        fmt.Sprintf("projects/%s/locations/%s/agents/%s/playbooks/%s", projectID, locationID, agentID, playbookID),
		DisplayName: "Updated Example Playbook",
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &cxpb.UpdatePlaybookRequest{
		Playbook:   playbook,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdatePlaybook(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePlaybook failed: %w", err)
	}

	fmt.Fprintf(w, "Updated playbook: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3beta1_playbooks_playbook_update]
