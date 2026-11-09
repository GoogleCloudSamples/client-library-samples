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

// [START dialogflow_v3_pages_page_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updatePage updates the display name of a Dialogflow CX page.
func updatePage(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string, pageID string) error {
	endpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	client, err := dialogflow.NewPagesClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewPagesClient: %w", err)
	}
	defer client.Close()

	page := &cxpb.Page{
		Name:        fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s/pages/%s", projectID, locationID, agentID, flowID, pageID),
		DisplayName: "updated-page-name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &cxpb.UpdatePageRequest{
		Page:       page,
		UpdateMask: updateMask,
	}

	response, err := client.UpdatePage(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePage: %w", err)
	}

	fmt.Fprintf(w, "Updated page: %s\n", response.GetName())
	return nil
}

// [END dialogflow_v3_pages_page_update]
