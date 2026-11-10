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

// [START iam-admin_v1_iam_query_auditable_services]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// queryAuditableServices queries the auditable services available on a resource.
func queryAuditableServices(ctx context.Context, w io.Writer, fullResourceName string) error {
	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("admin.NewIamClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.QueryAuditableServicesRequest{
		FullResourceName: fullResourceName,
	}

	resp, err := client.QueryAuditableServices(ctx, req)
	if err != nil {
		return fmt.Errorf("client.QueryAuditableServices: %w", err)
	}

	fmt.Fprintf(w, "Auditable services for %s:\n", fullResourceName)
	for _, service := range resp.GetServices() {
		fmt.Fprintf(w, "- %s\n", service.GetName())
	}

	return nil
}

// [END iam-admin_v1_iam_query_auditable_services]
