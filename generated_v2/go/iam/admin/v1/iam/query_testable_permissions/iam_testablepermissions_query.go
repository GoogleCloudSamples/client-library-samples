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

// [START iam-admin_v1_iam_query_testable_permissions]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/iam/admin/apiv1"
	adminpb "cloud.google.com/go/iam/admin/apiv1/adminpb"
)

// queryTestablePermissions queries permissions that can be tested on a resource.
func queryTestablePermissions(ctx context.Context, w io.Writer, fullResourceName string) error {
	client, err := admin.NewIamClient(ctx)
	if err != nil {
		return fmt.Errorf("admin.NewIamClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.QueryTestablePermissionsRequest{
		FullResourceName: fullResourceName,
	}

	for {
		resp, err := client.QueryTestablePermissions(ctx, req)
		if err != nil {
			return fmt.Errorf("client.QueryTestablePermissions: %w", err)
		}
		for _, perm := range resp.GetPermissions() {
			fmt.Fprintf(w, "Found permission: %s\n", perm.GetName())
		}
		if resp.GetNextPageToken() == "" {
			break
		}
		req.PageToken = resp.GetNextPageToken()
	}

	return nil
}

// [END iam-admin_v1_iam_query_testable_permissions]
