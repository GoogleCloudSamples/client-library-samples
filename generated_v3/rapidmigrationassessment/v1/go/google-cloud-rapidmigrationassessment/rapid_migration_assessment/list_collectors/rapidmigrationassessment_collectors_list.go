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

// [START rapidmigrationassessment_v1_rapidmigrationassessment_collectors_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	rapidmigrationassessment "cloud.google.com/go/rapidmigrationassessment/apiv1"
	rapidmigrationassessmentpb "cloud.google.com/go/rapidmigrationassessment/apiv1/rapidmigrationassessmentpb"
	"google.golang.org/api/iterator"
)

// listCollectors lists the Rapid Migration Assessment collectors in a location.
func listCollectors(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := rapidmigrationassessment.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &rapidmigrationassessmentpb.ListCollectorsRequest{
		Parent: parent,
	}

	it := client.ListCollectors(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListCollectors iteration failed: %w", err)
		}

		count++
		fmt.Fprintf(w, "Collector: %s\n", resp.GetName())
	}

	if count == 0 {
		fmt.Fprintln(w, "No collectors found.")
	}

	return nil
}

// [END rapidmigrationassessment_v1_rapidmigrationassessment_collectors_list]
