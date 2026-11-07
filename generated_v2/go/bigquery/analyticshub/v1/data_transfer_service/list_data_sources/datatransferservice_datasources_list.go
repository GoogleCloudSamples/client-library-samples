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

// [START analyticshub_v1_datatransferservice_datasources_list]

import (
	"context"
	"fmt"
	"io"

	datatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	"cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
	"google.golang.org/api/iterator"
)

// listDataSources lists supported data sources for BigQuery Data Transfer Service.
func listDataSources(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := datatransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datatransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &datatransferpb.ListDataSourcesRequest{
		Parent: parent,
	}

	it := client.ListDataSources(ctx, req)
	for {
		dataSource, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate data sources: %w", err)
		}
		fmt.Fprintf(w, "Data source: %s, Display name: %s\n", dataSource.GetName(), dataSource.GetDisplayName())
	}

	return nil
}

// [END analyticshub_v1_datatransferservice_datasources_list]
