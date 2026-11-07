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

// [START dialogflow_v3beta1_versions_version_delete]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// deleteVersion deletes a version of a Dialogflow CX flow.
func deleteVersion(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string, versionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s/versions/%s", projectID, locationID, agentID, flowID, versionID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewVersionsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewVersionsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.DeleteVersionRequest{
		Name: name,
	}

	if err := client.DeleteVersion(ctx, req); err != nil {
		return fmt.Errorf("DeleteVersion failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted version: %s\n", name)

	return nil
}

// [END dialogflow_v3beta1_versions_version_delete]
