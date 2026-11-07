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

// [START contactcenterinsights_v1_contactcenterinsights_bulk_delete_conversations]

import (
	"context"
	"fmt"
	"io"
	"strings"

	contactcenterinsights "cloud.google.com/go/contactcenterinsights/apiv1"
	contactcenterinsightspb "cloud.google.com/go/contactcenterinsights/apiv1/contactcenterinsightspb"
)

// bulkDeleteConversations bulk deletes conversations in Contact Center Insights matching a filter.
func bulkDeleteConversations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := contactcenterinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &contactcenterinsightspb.BulkDeleteConversationsRequest{
		Parent:         parent,
		Filter:         `medium = "PHONE_CALL"`,
		MaxDeleteCount: 100,
	}

	op, err := client.BulkDeleteConversations(ctx, req)
	if err != nil {
		return fmt.Errorf("BulkDeleteConversations failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if strings.Contains(err.Error(), "unsupported result type") {
			fmt.Fprintf(w, "Bulk delete conversations operation completed: %s\n", op.Name())
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Bulk deleted conversations: %v\n", resp)

	return nil
}

// [END contactcenterinsights_v1_contactcenterinsights_bulk_delete_conversations]
