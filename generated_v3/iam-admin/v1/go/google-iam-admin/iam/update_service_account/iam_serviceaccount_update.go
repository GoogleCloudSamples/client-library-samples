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

// [START iam-admin_v1_iam_serviceaccount_update]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// updateServiceAccount updates the display name of an existing service account.
func updateServiceAccount(ctx context.Context, w io.Writer, projectID string, serviceAccountID string) error {
	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("admin.NewIamClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/serviceAccounts/%s", projectID, serviceAccountID)

	// UpdateServiceAccount performs a full replacement without an update mask.
	// Retrieve the existing service account first to preserve required fields such as etag.
	serviceAccount, err := client.GetServiceAccount(ctx, &adminpb.GetServiceAccountRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("client.GetServiceAccount: %w", err)
	}

	// UpdateServiceAccount only supports updating the display_name field.
	serviceAccount.DisplayName = "Updated Display Name"

	updatedAccount, err := client.UpdateServiceAccount(ctx, serviceAccount)
	if err != nil {
		return fmt.Errorf("client.UpdateServiceAccount: %w", err)
	}

	fmt.Fprintf(w, "Updated service account: %s\n", updatedAccount.GetName())
	return nil
}

// [END iam-admin_v1_iam_serviceaccount_update]
