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

// [START biglake_v1beta_hivemetastoreservice_hivecatalogs_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	biglake "cloud.google.com/go/biglake/hive/apiv1beta"
	hivepb "cloud.google.com/go/biglake/hive/apiv1beta/hivepb"
	"google.golang.org/api/iterator"
)

// listHiveCatalogs lists all Hive catalogs in the specified project.
func listHiveCatalogs(ctx context.Context, w io.Writer) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = os.Getenv("PROJECT_ID")
	}
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}
	parent := fmt.Sprintf("projects/%s", projectIDOrNumber)

	client, err := biglake.NewHiveMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewHiveMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &hivepb.ListHiveCatalogsRequest{
		Parent: parent,
	}

	it := client.ListHiveCatalogs(ctx, req)
	count := 0
	for {
		catalog, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate Hive catalogs: %w", err)
		}
		fmt.Fprintf(w, "Catalog: %s\n", catalog.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No Hive catalogs found.")
	}

	return nil
}

// [END biglake_v1beta_hivemetastoreservice_hivecatalogs_list]
