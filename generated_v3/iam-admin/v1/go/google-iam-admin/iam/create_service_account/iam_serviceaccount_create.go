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

// [START iam-admin_v1_iam_serviceaccount_create]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// createServiceAccount creates a service account in the specified project.
func createServiceAccount(ctx context.Context, w io.Writer, accountID string, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)
	serviceAccount := &adminpb.ServiceAccount{
		DisplayName: "Sample Service Account",
		Description: "Service account created for demonstration",
	}

	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.CreateServiceAccountRequest{
		Name:           name,
		AccountId:      accountID,
		ServiceAccount: serviceAccount,
	}

	response, err := client.CreateServiceAccount(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateServiceAccount: %w", err)
	}

	fmt.Fprintf(w, "Created service account: %s\n", response.GetEmail())
	return nil
}

// [END iam-admin_v1_iam_serviceaccount_create]
