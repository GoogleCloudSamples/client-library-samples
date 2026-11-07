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

// [START billingbudgets_v1_cloudbilling_projectbillinginfo_get]

import (
	"context"
	"fmt"
	"io"

	billingbudgets "cloud.google.com/go/billing/apiv1"
	"cloud.google.com/go/billing/apiv1/billingpb"
)

// getProjectBillingInfo retrieves the billing configuration for a Google Cloud project.
func getProjectBillingInfo(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := billingbudgets.NewCloudBillingClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudBillingClient failed: %w", err)
	}
	defer client.Close()

	req := &billingpb.GetProjectBillingInfoRequest{
		Name: name,
	}

	info, err := client.GetProjectBillingInfo(ctx, req)
	if err != nil {
		return fmt.Errorf("GetProjectBillingInfo: %w", err)
	}

	fmt.Fprintf(w, "Project: %s\n", info.GetProjectId())
	fmt.Fprintf(w, "Billing account name: %s\n", info.GetBillingAccountName())
	fmt.Fprintf(w, "Billing enabled: %t\n", info.GetBillingEnabled())

	return nil
}

// [END billingbudgets_v1_cloudbilling_projectbillinginfo_get]
