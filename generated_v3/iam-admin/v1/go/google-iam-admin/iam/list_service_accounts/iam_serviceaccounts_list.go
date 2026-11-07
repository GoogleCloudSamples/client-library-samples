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

// [START iam-admin_v1_iam_serviceaccounts_list]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
	"google.golang.org/api/iterator"
)

// listServiceAccounts lists all service accounts in the specified project.
func listServiceAccounts(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListServiceAccountsRequest{
		Name: name,
	}

	it := client.ListServiceAccounts(ctx, req)
	for {
		sa, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to list service accounts: %w", err)
		}
		fmt.Fprintf(w, "Service account: %s (%s)\n", sa.GetDisplayName(), sa.GetEmail())
	}

	return nil
}

// [END iam-admin_v1_iam_serviceaccounts_list]
