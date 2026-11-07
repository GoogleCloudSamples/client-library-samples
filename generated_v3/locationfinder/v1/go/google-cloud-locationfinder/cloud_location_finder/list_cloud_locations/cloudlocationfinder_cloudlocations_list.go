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

// [START locationfinder_v1_cloudlocationfinder_cloudlocations_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	locationfinder "cloud.google.com/go/locationfinder/apiv1"
	locationfinderpb "cloud.google.com/go/locationfinder/apiv1/locationfinderpb"
	"google.golang.org/api/iterator"
)

// listCloudLocations retrieves available cloud locations for a project and location.
func listCloudLocations(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := locationfinder.NewCloudLocationFinderClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudLocationFinderClient failed: %w", err)
	}
	defer client.Close()

	req := &locationfinderpb.ListCloudLocationsRequest{
		Parent: parent,
	}

	it := client.ListCloudLocations(ctx, req)
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListCloudLocations failed: %w", err)
		}
		fmt.Fprintf(w, "Cloud Location: %s\n", resp.GetName())
	}

	return nil
}

// [END locationfinder_v1_cloudlocationfinder_cloudlocations_list]
