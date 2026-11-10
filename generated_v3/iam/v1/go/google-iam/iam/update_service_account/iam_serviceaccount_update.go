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

// [START iam_v1_iam_serviceaccount_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	iam "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// updateServiceAccount updates the display name and description of a service account.
func updateServiceAccount(ctx context.Context, w io.Writer) error {
	client, err := iam.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable is not set")
	}

	serviceAccountEmail := os.Getenv("SERVICE_ACCOUNT_EMAIL")
	if serviceAccountEmail == "" {
		serviceAccountEmail = fmt.Sprintf("example-sa@%s.iam.gserviceaccount.com", projectID)
	}
	resourceName := fmt.Sprintf("projects/%s/serviceAccounts/%s", projectID, serviceAccountEmail)

	req := &adminpb.ServiceAccount{
		Name:        resourceName,
		DisplayName: "Updated Display Name",
		Description: "Updated description for the service account.",
	}

	sa, err := client.UpdateServiceAccount(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateServiceAccount: %w", err)
	}

	fmt.Fprintf(w, "Updated service account: %s\n", sa.GetName())
	return nil
}

// [END iam_v1_iam_serviceaccount_update]
