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

// [START networkmanagement_v1_reachabilityservice_connectivitytests_list]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	"cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iterator"
)

// listConnectivityTests retrieves connectivity tests in a Google Cloud project.
func listConnectivityTests(ctx context.Context, w io.Writer, projectID string) error {
	if projectID == "" {
		if envProject := os.Getenv("GOOGLE_CLOUD_PROJECT"); envProject != "" {
			projectID = envProject
		} else if envProject := os.Getenv("GCP_PROJECT"); envProject != "" {
			projectID = envProject
		} else if creds, err := google.FindDefaultCredentials(ctx); err == nil && creds.ProjectID != "" {
			projectID = creds.ProjectID
		}
	}

	projectID = strings.TrimSpace(projectID)
	projectID = strings.TrimPrefix(projectID, "projects/")
	projectID = strings.TrimSuffix(projectID, "/locations/global")

	parent := fmt.Sprintf("projects/%s/locations/global", projectID)

	client, err := networkmanagement.NewReachabilityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewReachabilityClient: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.ListConnectivityTestsRequest{
		Parent: parent,
	}

	it := client.ListConnectivityTests(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListConnectivityTests: %w", err)
		}
		fmt.Fprintf(w, "Connectivity test: %s\n", resp.GetName())
	}

	return nil
}

// [END networkmanagement_v1_reachabilityservice_connectivitytests_list]
