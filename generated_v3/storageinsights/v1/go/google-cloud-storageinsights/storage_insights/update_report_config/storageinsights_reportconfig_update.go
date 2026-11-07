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

// [START storageinsights_v1_storageinsights_reportconfig_update]

import (
	"context"
	"fmt"
	"io"

	storageinsights "cloud.google.com/go/storageinsights/apiv1"
	"cloud.google.com/go/storageinsights/apiv1/storageinsightspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateReportConfig method.
func updateReportConfig(ctx context.Context, w io.Writer, projectID string, locationID string, reportConfigID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}
	reportConfig := &storageinsightspb.ReportConfig{
		Name:        fmt.Sprintf("projects/%s/locations/%s/reportConfigs/%s", projectID, locationID, reportConfigID),
		DisplayName: "Updated Report Config",
	}

	client, err := storageinsights.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storageinsightspb.UpdateReportConfigRequest{
		UpdateMask:   updateMask,
		ReportConfig: reportConfig,
	}

	resp, err := client.UpdateReportConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateReportConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated report config: %s\n", resp.GetName())

	return nil
}

// [END storageinsights_v1_storageinsights_reportconfig_update]
