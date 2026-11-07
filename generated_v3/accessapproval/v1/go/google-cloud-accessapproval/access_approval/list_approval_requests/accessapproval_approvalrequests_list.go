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

// [START accessapproval_v1_accessapproval_approvalrequests_list]

import (
	"context"
	"fmt"
	"io"

	accessapproval "cloud.google.com/go/accessapproval/apiv1"
	accessapprovalpb "cloud.google.com/go/accessapproval/apiv1/accessapprovalpb"
	"google.golang.org/api/iterator"
)

// listApprovalRequests retrieves all approval requests for a project.
func listApprovalRequests(ctx context.Context, w io.Writer, projectID string) error {
	client, err := accessapproval.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &accessapprovalpb.ListApprovalRequestsMessage{
		Parent: fmt.Sprintf("projects/%s", projectID),
	}

	it := client.ListApprovalRequests(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate approval requests: %w", err)
		}
		fmt.Fprintf(w, "Approval request: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No approval requests found.")
	}

	return nil
}

// [END accessapproval_v1_accessapproval_approvalrequests_list]
