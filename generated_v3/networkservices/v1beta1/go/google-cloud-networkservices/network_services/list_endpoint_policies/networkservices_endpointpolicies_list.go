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

// [START networkservices_v1beta1_networkservices_endpointpolicies_list]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	"cloud.google.com/go/compute/metadata"
	networkservices "cloud.google.com/go/networkservices/apiv1beta1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1beta1/networkservicespb"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iterator"
)

// listEndpointPolicies retrieves endpoint policies under a given project and location.
func listEndpointPolicies(ctx context.Context, w io.Writer, projectID string) error {
	if projectID == "" {
		projectID = os.Getenv("GOOGLE_CLOUD_PROJECT")
	}
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		if creds, err := google.FindDefaultCredentials(ctx); err == nil && creds.ProjectID != "" {
			projectID = creds.ProjectID
		}
	}
	if projectID == "" && metadata.OnGCE() {
		if pid, err := metadata.ProjectID(); err == nil {
			projectID = pid
		}
	}

	projectID = strings.TrimSpace(projectID)
	projectID = strings.TrimPrefix(projectID, "projects/")

	parent := fmt.Sprintf("projects/%s/locations/global", projectID)
	if strings.Contains(projectID, "/locations/") {
		parent = projectID
	}

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.ListEndpointPoliciesRequest{
		Parent: parent,
	}

	it := client.ListEndpointPolicies(ctx, req)
	for {
		policy, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next failed: %w", err)
		}

		fmt.Fprintf(w, "Endpoint Policy: %s\n", policy.GetName())
	}

	return nil
}

// [END networkservices_v1beta1_networkservices_endpointpolicies_list]
