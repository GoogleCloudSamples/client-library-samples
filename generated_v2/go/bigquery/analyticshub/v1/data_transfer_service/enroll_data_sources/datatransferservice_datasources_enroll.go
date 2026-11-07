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

// [START analyticshub_v1_datatransferservice_enroll_data_sources]

import (
	"context"
	"fmt"
	"io"

	datatransfer "cloud.google.com/go/bigquery/datatransfer/apiv1"
	"cloud.google.com/go/bigquery/datatransfer/apiv1/datatransferpb"
)

// enrollDataSources enrolls data sources for a specified project.
func enrollDataSources(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := datatransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datatransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &datatransferpb.EnrollDataSourcesRequest{
		Name:          name,
		DataSourceIds: []string{"play"},
	}

	if err := client.EnrollDataSources(ctx, req); err != nil {
		return fmt.Errorf("EnrollDataSources: %w", err)
	}

	fmt.Fprintf(w, "Enrolled data sources for %s\n", name)
	return nil
}

// [END analyticshub_v1_datatransferservice_enroll_data_sources]
