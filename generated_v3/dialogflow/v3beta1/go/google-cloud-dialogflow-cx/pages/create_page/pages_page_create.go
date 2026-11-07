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

// [START dialogflow_v3beta1_pages_page_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// createPage creates a new page in the specified Dialogflow CX flow.
func createPage(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s", projectID, locationID, agentID, flowID)

	page := &cxpb.Page{
		DisplayName: "example-page",
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewPagesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewPagesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreatePageRequest{
		Parent: parent,
		Page:   page,
	}

	resp, err := client.CreatePage(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePage failed: %w", err)
	}

	fmt.Fprintf(w, "Created page: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3beta1_pages_page_create]
