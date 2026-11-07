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

// [START iam_v1_iam_role_get]

import (
	"context"
	"fmt"
	"io"

	iam "cloud.google.com/go/iam/admin/apiv1"
	adminpb "cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// getRole retrieves an IAM role by its identifier.
func getRole(ctx context.Context, w io.Writer, roleID string) error {
	name := fmt.Sprintf("roles/%s", roleID)

	client, err := iam.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIamClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetRoleRequest{
		Name: name,
	}

	role, err := client.GetRole(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetRole failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved role: %s\nTitle: %s\nDescription: %s\n", role.GetName(), role.GetTitle(), role.GetDescription())
	return nil
}

// [END iam_v1_iam_role_get]
