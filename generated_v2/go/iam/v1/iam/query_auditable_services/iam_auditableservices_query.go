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

// [START iam_v1_iam_query_auditable_services]

import (
	"context"
	"fmt"
	"io"
	"os"

	iam "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// queryAuditableServices retrieves services that support audit logging for a project.
func queryAuditableServices(ctx context.Context, w io.Writer) error {
	client, err := iam.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable is not set")
	}
	fullResourceName := fmt.Sprintf("//cloudresourcemanager.googleapis.com/projects/%s", projectID)

	req := &adminpb.QueryAuditableServicesRequest{
		FullResourceName: fullResourceName,
	}

	resp, err := client.QueryAuditableServices(ctx, req)
	if err != nil {
		return fmt.Errorf("QueryAuditableServices: %w", err)
	}

	fmt.Fprintf(w, "Auditable services for %s:\n", fullResourceName)
	for _, service := range resp.GetServices() {
		fmt.Fprintf(w, "- %s\n", service.GetName())
	}

	return nil
}

// [END iam_v1_iam_query_auditable_services]
