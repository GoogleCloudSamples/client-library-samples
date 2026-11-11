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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_get]

import (
	"context"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	networkmanagementpb "cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
)

// getConnectivityTest retrieves the configuration and result of a connectivity test.
func getConnectivityTest(ctx context.Context, w io.Writer, projectID string, testID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/connectivityTests/%s", projectID, testID)

	client, err := networkmanagement.NewReachabilityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewReachabilityClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.GetConnectivityTestRequest{
		Name: name,
	}

	resp, err := client.GetConnectivityTest(ctx, req)
	if err != nil {
		return fmt.Errorf("GetConnectivityTest failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved connectivity test: %s\n", resp.GetName())
	return nil
}

// [END networkmanagement_v1_reachabilityservice_connectivitytest_get]
