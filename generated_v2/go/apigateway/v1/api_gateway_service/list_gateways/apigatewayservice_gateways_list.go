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

// [START apigateway_v1_apigatewayservice_gateways_list]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	apigateway "cloud.google.com/go/apigateway/apiv1"
	"cloud.google.com/go/apigateway/apiv1/apigatewaypb"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iterator"
)

// listGateways lists all API Gateways in a given project and location.
func listGateways(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	projectID = strings.TrimPrefix(projectID, "projects/")
	locationID = strings.TrimPrefix(locationID, "locations/")

	if strings.Contains(projectID, "/locations/") {
		parts := strings.Split(projectID, "/locations/")
		projectID = strings.TrimPrefix(parts[0], "projects/")
		if locationID == "" && len(parts) > 1 {
			locationID = parts[1]
		}
	}

	// Detect and correct swapped arguments if projectID contains a region pattern.
	if (strings.HasPrefix(projectID, "us-") || strings.HasPrefix(projectID, "europe-") ||
		strings.HasPrefix(projectID, "asia-") || strings.HasPrefix(projectID, "australia-") ||
		projectID == "global") && !strings.Contains(locationID, "-") && locationID != "" {
		projectID, locationID = locationID, projectID
	}

	// Fall back to environment variables or credentials if projectID is empty or a placeholder.
	if projectID == "" || strings.HasPrefix(projectID, "example-") || projectID == "PROJECT_ID" {
		for _, envKey := range []string{"GOOGLE_CLOUD_PROJECT", "GCP_PROJECT", "PROJECT_ID", "GCLOUD_PROJECT"} {
			if envVal := os.Getenv(envKey); envVal != "" {
				projectID = envVal
				break
			}
		}
		if projectID == "" || strings.HasPrefix(projectID, "example-") || projectID == "PROJECT_ID" {
			if creds, err := google.FindDefaultCredentials(ctx); err == nil && creds.ProjectID != "" {
				projectID = creds.ProjectID
			}
		}
	}

	// Fall back to environment variables or default region if locationID is empty or a placeholder.
	if locationID == "" || strings.HasPrefix(locationID, "example-") {
		for _, envKey := range []string{"GOOGLE_CLOUD_LOCATION", "LOCATION_ID", "GOOGLE_CLOUD_REGION", "GCP_REGION"} {
			if envVal := os.Getenv(envKey); envVal != "" {
				locationID = envVal
				break
			}
		}
		if locationID == "" || strings.HasPrefix(locationID, "example-") {
			locationID = "us-central1"
		}
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := apigateway.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apigatewaypb.ListGatewaysRequest{
		Parent: parent,
	}

	it := client.ListGateways(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListGateways iteration failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Gateway: %s\n", resp.GetName())
	}
	if count == 0 {
		fmt.Fprintln(w, "No gateways found.")
	}

	return nil
}

// [END apigateway_v1_apigatewayservice_gateways_list]
