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

// [START iam-admin_v1_iam_serviceaccount_get]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// getServiceAccount retrieves an existing service account by ID.
func getServiceAccount(ctx context.Context, w io.Writer, projectID string, accountID string) error {
	name := fmt.Sprintf("projects/%s/serviceAccounts/%s", projectID, accountID)

	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetServiceAccountRequest{
		Name: name,
	}

	sa, err := client.GetServiceAccount(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetServiceAccount: %w", err)
	}

	fmt.Fprintf(w, "Retrieved service account: %s\n", sa.Name)
	return nil
}

// [END iam-admin_v1_iam_serviceaccount_get]
