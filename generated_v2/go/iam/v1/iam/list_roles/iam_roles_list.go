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

// [START iam_v1_iam_roles_list]

import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/admin/apiv1"
	"cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// listRoles lists predefined Google Cloud roles.
func listRoles(ctx context.Context, w io.Writer) error {
	client, err := iam.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListRolesRequest{
		View: adminpb.RoleView_BASIC,
	}

	resp, err := client.ListRoles(ctx, req)
	if err != nil {
		return fmt.Errorf("client.ListRoles: %w", err)
	}

	for _, role := range resp.GetRoles() {
		fmt.Fprintf(w, "Role: %s (Title: %s)\n", role.GetName(), role.GetTitle())
	}

	return nil
}

// [END iam_v1_iam_roles_list]
