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

// [START datafusion_v1_datafusion_availableversions_list]

import (
	"context"
	"fmt"
	"io"

	datafusion "cloud.google.com/go/datafusion/apiv1"
	datafusionpb "cloud.google.com/go/datafusion/apiv1/datafusionpb"
	"google.golang.org/api/iterator"
)

// listAvailableVersions retrieves available Cloud Data Fusion versions in a location.
func listAvailableVersions(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datafusion.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datafusionpb.ListAvailableVersionsRequest{
		Parent: parent,
	}

	it := client.ListAvailableVersions(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListAvailableVersions: %w", err)
		}

		fmt.Fprintf(w, "Version: %s, Default: %t\n", resp.GetVersionNumber(), resp.GetDefaultVersion())
	}

	return nil
}

// [END datafusion_v1_datafusion_availableversions_list]
