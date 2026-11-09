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

// [START dialogflow_v3beta1_changelogs_changelog_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// getChangelog retrieves a changelog for a Dialogflow CX agent.
func getChangelog(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, changelogID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/changelogs/%s", projectID, locationID, agentID, changelogID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	opts = append(opts, option.WithQuotaProject(projectID))

	client, err := dialogflow.NewChangelogsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("dialogflow.NewChangelogsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetChangelogRequest{
		Name: name,
	}

	resp, err := client.GetChangelog(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetChangelog: %w", err)
	}

	fmt.Fprintf(w, "Retrieved changelog: %s\n", resp.GetName())

	return nil
}

// [END dialogflow_v3beta1_changelogs_changelog_get]
