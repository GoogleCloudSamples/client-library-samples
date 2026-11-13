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

// [START bigtableadmin_v2_bigtableinstanceadmin_materializedviews_list]

import (
	"context"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/bigtable/admin/apiv2/adminpb"
	"google.golang.org/api/iterator"
)

// listMaterializedViews lists the Cloud Bigtable materialized views in an instance.
func listMaterializedViews(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient failed: %w", err)
	}
	defer client.Close()

	req := &adminpb.ListMaterializedViewsRequest{
		Parent: parent,
	}

	it := client.ListMaterializedViews(ctx, req)
	var count int
	for {
		materializedView, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListMaterializedViews iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Materialized view: %s\n", materializedView.GetName())
		count++
	}
	if count == 0 {
		fmt.Fprintf(w, "No materialized views found in instance %s\n", instanceID)
	}

	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_materializedviews_list]
