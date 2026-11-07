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

// [START bigtableadmin_v2_bigtabletableadmin_authorizedview_get]

import (
	"context"
	"fmt"
	"io"

	admin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
)

// getAuthorizedView retrieves an authorized view from a Cloud Bigtable table.
func getAuthorizedView(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string, authorizedViewID string) error {
	name := fmt.Sprintf("projects/%s/instances/%s/tables/%s/authorizedViews/%s", projectID, instanceID, tableID, authorizedViewID)

	client, err := admin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.GetAuthorizedViewRequest{
		Name: name,
	}

	resp, err := client.GetAuthorizedView(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAuthorizedView failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved authorized view: %s\n", resp.GetName())
	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_authorizedview_get]
