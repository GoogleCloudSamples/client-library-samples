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

// [START contactcenterinsights_v1_contactcenterinsights_view_create]

import (
	"context"
	"fmt"
	"io"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// createView creates a Contact Center Insights view for conversations.
func createView(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	view := &contactcenterinsightspb.View{
		DisplayName: "Phone Call View",
		Value:       `medium="PHONE_CALL"`,
	}

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("contactcenterinsights.NewClient: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.CreateViewRequest{
		Parent: parent,
		View:   view,
	}

	resp, err := client.CreateView(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateView: %w", err)
	}

	fmt.Fprintf(w, "Created view: %s\n", resp.GetName())
	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_view_create]
