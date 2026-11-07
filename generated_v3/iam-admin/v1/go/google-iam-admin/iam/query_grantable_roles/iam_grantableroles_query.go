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

// [START iam-admin_v1_iam_query_grantable_roles]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// queryGrantableRoles queries roles that can be granted on a Google Cloud resource.
func queryGrantableRoles(ctx context.Context, w io.Writer, fullResourceName string) error {
	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.QueryGrantableRolesRequest{
		FullResourceName: fullResourceName,
	}

	resp, err := client.QueryGrantableRoles(ctx, req)
	if err != nil {
		return fmt.Errorf("QueryGrantableRoles failed: %w", err)
	}

	for _, role := range resp.GetRoles() {
		fmt.Fprintf(w, "Role: %s\n", role.GetName())
	}

	return nil
}

// [END iam-admin_v1_iam_query_grantable_roles]
