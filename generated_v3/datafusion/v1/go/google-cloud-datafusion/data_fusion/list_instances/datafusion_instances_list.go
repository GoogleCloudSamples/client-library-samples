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

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"strings"
	"unicode"

	datafusion "cloud.google.com/go/datafusion/apiv1"
	datafusionpb "cloud.google.com/go/datafusion/apiv1/datafusionpb"
	"google.golang.org/api/iterator"
)

// [START datafusion_v1_datafusion_instances_list]

// isRegion reports whether a string matches a Google Cloud region pattern or wildcard.
func isRegion(s string) bool {
	if s == "-" || s == "global" {
		return true
	}
	prefixes := []string{"us-", "europe-", "asia-", "australia-", "northamerica-", "southamerica-", "me-", "africa-"}
	for _, p := range prefixes {
		if strings.HasPrefix(s, p) && len(s) > len(p) && unicode.IsDigit(rune(s[len(s)-1])) {
			return true
		}
	}
	return false
}

// listInstances retrieves Cloud Data Fusion instances in the specified project and location.
func listInstances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	// Fall back to environment variables when identifiers are not supplied.
	if projectID == "" {
		projectID = os.Getenv("GOOGLE_CLOUD_PROJECT")
		if projectID == "" {
			projectID = os.Getenv("GCLOUD_PROJECT")
		}
	}
	if locationID == "" {
		locationID = os.Getenv("GOOGLE_CLOUD_LOCATION")
		if locationID == "" {
			locationID = os.Getenv("GOOGLE_CLOUD_REGION")
		}
		if locationID == "" {
			// Data Fusion accepts "-" as a wildcard to query all locations.
			locationID = "-"
		}
	}

	// Normalize resource prefixes if callers supply full or partial resource paths.
	projectID = strings.TrimPrefix(projectID, "projects/")
	locationID = strings.TrimPrefix(locationID, "locations/")
	if strings.Contains(projectID, "/locations/") {
		parts := strings.Split(projectID, "/locations/")
		projectID = strings.TrimPrefix(parts[0], "projects/")
		if locationID == "" || locationID == "-" {
			locationID = parts[1]
		}
	}

	// Correct swapped project and location arguments if encountered.
	if isRegion(projectID) && !isRegion(locationID) && locationID != "" {
		projectID, locationID = locationID, projectID
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datafusion.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datafusionpb.ListInstancesRequest{
		Parent: parent,
	}

	it := client.ListInstances(ctx, req)
	for {
		instance, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListInstances iteration failed: %w", err)
		}

		fmt.Fprintf(w, "Instance: %s (State: %s)\n", instance.GetName(), instance.GetState())
	}

	return nil
}

// [END datafusion_v1_datafusion_instances_list]
