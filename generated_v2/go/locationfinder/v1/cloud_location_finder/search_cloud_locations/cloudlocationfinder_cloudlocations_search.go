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

// [START locationfinder_v1_cloudlocationfinder_cloudlocations_search]

import (
	"context"
	"fmt"
	"io"
	"strings"

	locationfinder "cloud.google.com/go/locationfinder/apiv1"
	locationfinderpb "cloud.google.com/go/locationfinder/apiv1/locationfinderpb"
	"google.golang.org/api/iterator"
)

// searchCloudLocations searches cloud locations relative to a source location.
func searchCloudLocations(ctx context.Context, w io.Writer, projectID string, locationID string, sourceCloudLocationID string) error {
	if !strings.Contains(sourceCloudLocationID, "/") &&
		!strings.HasPrefix(sourceCloudLocationID, "gcp-") &&
		!strings.HasPrefix(sourceCloudLocationID, "aws-") &&
		!strings.HasPrefix(sourceCloudLocationID, "azure-") &&
		!strings.HasPrefix(sourceCloudLocationID, "oci-") {
		sourceCloudLocationID = fmt.Sprintf("gcp-%s", sourceCloudLocationID)
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	sourceCloudLocation := fmt.Sprintf("projects/%s/locations/%s/cloudLocations/%s", projectID, locationID, sourceCloudLocationID)

	client, err := locationfinder.NewCloudLocationFinderClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudLocationFinderClient: %w", err)
	}
	defer client.Close()

	req := &locationfinderpb.SearchCloudLocationsRequest{
		Parent:              parent,
		SourceCloudLocation: sourceCloudLocation,
	}

	it := client.SearchCloudLocations(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Cloud location: %s\n", resp.GetName())
	}

	return nil
}

// [END locationfinder_v1_cloudlocationfinder_cloudlocations_search]
