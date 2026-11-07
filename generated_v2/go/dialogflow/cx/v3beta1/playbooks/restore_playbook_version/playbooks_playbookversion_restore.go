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

// [START dialogflow_v3beta1_playbooks_restore_playbook_version]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// restorePlaybookVersion restores a specified playbook version to the draft playbook.
func restorePlaybookVersion(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, playbookID string, versionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/playbooks/%s/versions/%s", projectID, locationID, agentID, playbookID, versionID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewPlaybooksClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewPlaybooksClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.RestorePlaybookVersionRequest{
		Name: name,
	}

	response, err := client.RestorePlaybookVersion(ctx, req)
	if err != nil {
		return fmt.Errorf("RestorePlaybookVersion failed: %w", err)
	}

	fmt.Fprintf(w, "Restored playbook: %s\n", response.GetPlaybook().GetName())
	return nil
}

// [END dialogflow_v3beta1_playbooks_restore_playbook_version]
