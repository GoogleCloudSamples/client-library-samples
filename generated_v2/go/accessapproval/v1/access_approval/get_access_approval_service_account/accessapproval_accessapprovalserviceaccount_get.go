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

// [START accessapproval_v1_accessapproval_accessapprovalserviceaccount_get]

import (
	"context"
	"fmt"
	"io"

	accessapproval "cloud.google.com/go/accessapproval/apiv1"
	accessapprovalpb "cloud.google.com/go/accessapproval/apiv1/accessapprovalpb"
)

// getAccessApprovalServiceAccount retrieves the Access Approval service account for a project.
func getAccessApprovalServiceAccount(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s/serviceAccount", projectID)

	client, err := accessapproval.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &accessapprovalpb.GetAccessApprovalServiceAccountMessage{
		Name: name,
	}

	serviceAccount, err := client.GetAccessApprovalServiceAccount(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAccessApprovalServiceAccount: %w", err)
	}

	fmt.Fprintf(w, "Service Account Email: %s\n", serviceAccount.GetAccountEmail())

	return nil
}

// [END accessapproval_v1_accessapproval_accessapprovalserviceaccount_get]
