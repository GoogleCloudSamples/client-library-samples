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

// [START composer_v1_imageversions_imageversions_list]

import (
	"context"
	"fmt"
	"io"

	composer "cloud.google.com/go/orchestration/airflow/service/apiv1"
	composerpb "cloud.google.com/go/orchestration/airflow/service/apiv1/servicepb"
	"google.golang.org/api/iterator"
)

// listImageVersions lists the Cloud Composer image versions available in a location.
func listImageVersions(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := composer.NewImageVersionsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewImageVersionsClient failed: %w", err)
	}
	defer client.Close()

	req := &composerpb.ListImageVersionsRequest{
		Parent: parent,
	}

	it := client.ListImageVersions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next: %w", err)
		}
		fmt.Fprintf(w, "Image version: %s\n", resp.GetImageVersionId())
	}

	return nil
}

// [END composer_v1_imageversions_imageversions_list]
