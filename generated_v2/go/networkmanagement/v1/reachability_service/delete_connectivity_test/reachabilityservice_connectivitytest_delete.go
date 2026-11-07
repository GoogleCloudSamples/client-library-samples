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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_delete]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	networkmanagementpb "cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
)

// deleteConnectivityTest deletes an existing connectivity test.
func deleteConnectivityTest(ctx context.Context, w io.Writer, projectID string, testID string) error {
	if testID == "" {
		fmt.Fprintln(w, "No connectivity test specified to delete.")
		return nil
	}

	name := testID
	if !strings.HasPrefix(testID, "projects/") {
		projectID = strings.TrimPrefix(projectID, "projects/")
		if idx := strings.Index(projectID, "/"); idx != -1 {
			projectID = projectID[:idx]
		}
		if projectID == "" {
			projectID = os.Getenv("GOOGLE_CLOUD_PROJECT")
		}
		name = fmt.Sprintf("projects/%s/locations/global/connectivityTests/%s", projectID, testID)
	}

	client, err := networkmanagement.NewReachabilityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewReachabilityClient: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.DeleteConnectivityTestRequest{
		Name: name,
	}

	op, err := client.DeleteConnectivityTest(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteConnectivityTest: %w", err)
	}

	// Wait for the long-running operation to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted connectivity test: %s\n", name)
	return nil
}

// [END networkmanagement_v1_reachabilityservice_connectivitytest_delete]
