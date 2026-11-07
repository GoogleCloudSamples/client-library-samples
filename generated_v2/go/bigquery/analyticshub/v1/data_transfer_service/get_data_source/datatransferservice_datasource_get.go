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

// [START analyticshub_v1_datatransferservice_datasource_get]

import (
	"context"
	"fmt"
	"io"

	datatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	datatransferpb "cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
)

// getDataSource retrieves metadata for a specified data source.
func getDataSource(ctx context.Context, w io.Writer, projectID string, dataSourceID string) error {
	name := fmt.Sprintf("projects/%s/dataSources/%s", projectID, dataSourceID)

	client, err := datatransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datatransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &datatransferpb.GetDataSourceRequest{
		Name: name,
	}

	dataSource, err := client.GetDataSource(ctx, req)
	if err != nil {
		return fmt.Errorf("GetDataSource: %w", err)
	}

	fmt.Fprintf(w, "Data source: %s\n", dataSource.GetDisplayName())
	fmt.Fprintf(w, "Description: %s\n", dataSource.GetDescription())
	return nil
}

// [END analyticshub_v1_datatransferservice_datasource_get]
