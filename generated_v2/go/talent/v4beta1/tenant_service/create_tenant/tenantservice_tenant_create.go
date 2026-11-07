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

// [START jobs_v4beta1_tenantservice_tenant_create]

import (
	"context"
	"fmt"
	"io"

	jobs "cloud.google.com/go/talent/apiv4beta1"
	talentpb "cloud.google.com/go/talent/apiv4beta1/talentpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createTenant creates a new tenant in Cloud Talent Solution.
func createTenant(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	tenant := &talentpb.Tenant{
		ExternalId: "example-tenant-external-id",
	}

	client, err := jobs.NewTenantClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTenantClient: %w", err)
	}
	defer client.Close()

	req := &talentpb.CreateTenantRequest{
		Parent: parent,
		Tenant: tenant,
	}

	response, err := client.CreateTenant(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			// Cloud Talent Solution requires projects to complete data permission onboarding in the Google Cloud console.
			fmt.Fprintln(w, "Tenant creation requires data permission onboarding in the Google Cloud console.")
			return nil
		}
		return fmt.Errorf("CreateTenant: %w", err)
	}

	fmt.Fprintf(w, "Created tenant: %s\n", response.GetName())
	return nil
}

// [END jobs_v4beta1_tenantservice_tenant_create]
