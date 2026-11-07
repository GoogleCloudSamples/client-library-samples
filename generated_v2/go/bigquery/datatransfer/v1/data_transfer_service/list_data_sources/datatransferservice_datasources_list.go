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

// [START bigquerydatatransfer_v1_datatransferservice_datasources_list]

import (
	"context"
	"fmt"
	"io"

	bigquerydatatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	datatransferpb "cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listDataSources retrieves supported data sources for a given project.
func listDataSources(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := bigquerydatatransfer.NewClient(ctx, option.WithQuotaProject(projectID))
	if err != nil {
		return fmt.Errorf("bigquerydatatransfer.NewClient: %w", err)
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
			return fmt.Errorf("ListDataSources iteration: %w", err)
		}
		fmt.Fprintf(w, "Data Source ID: %s, Name: %s\n", dataSource.GetDataSourceId(), dataSource.GetDisplayName())
	}

	return nil
}

// [END bigquerydatatransfer_v1_datatransferservice_datasources_list]
