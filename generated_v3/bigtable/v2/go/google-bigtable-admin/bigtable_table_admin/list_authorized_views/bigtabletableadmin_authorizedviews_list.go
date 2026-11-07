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

// [START bigtableadmin_v2_bigtabletableadmin_authorizedviews_list]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	adminpb "cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/api/iterator"
)

// listAuthorizedViews lists authorized views in a Cloud Bigtable table.
func listAuthorizedViews(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)

	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableTableAdminClient: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListAuthorizedViewsRequest{
		Parent: parent,
	}

	it := client.ListAuthorizedViews(ctx, req)
	for {
		view, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve authorized view: %w", err)
		}
		fmt.Fprintf(w, "Authorized view: %s\n", view.GetName())
	}

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_authorizedviews_list]
