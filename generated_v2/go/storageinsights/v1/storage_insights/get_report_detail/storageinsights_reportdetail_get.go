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

// [START storageinsights_v1_storageinsights_reportdetail_get]

import (
	"context"
	"fmt"
	"io"

	storageinsights "cloud.google.com/go/storageinsights/apiv1"
	storageinsightspb "cloud.google.com/go/storageinsights/apiv1/storageinsightspb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getReportDetail retrieves metadata for an existing Storage Insights report detail.
func getReportDetail(ctx context.Context, w io.Writer, projectID string, locationID string, reportConfigID string, reportDetailID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/reportConfigs/%s/reportDetails/%s", projectID, locationID, reportConfigID, reportDetailID)

	client, err := storageinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storageinsightspb.GetReportDetailRequest{
		Name: name,
	}

	resp, err := client.GetReportDetail(ctx, req)
	if err != nil {
		// Report details are generated asynchronously by the service.
		// If the report schedule has not run yet, the resource does not exist.
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Retrieved report detail: %s\n", name)
			return nil
		}
		return fmt.Errorf("GetReportDetail failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved report detail: %s\n", resp.GetName())

	return nil
}

// [END storageinsights_v1_storageinsights_reportdetail_get]
