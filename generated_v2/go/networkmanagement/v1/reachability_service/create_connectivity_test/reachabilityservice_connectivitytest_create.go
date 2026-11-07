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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_create]

import (
	"context"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	networkmanagementpb "cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
)

// createConnectivityTest creates a new connectivity test in Network Management.
func createConnectivityTest(ctx context.Context, w io.Writer, projectID string, testID string) error {
	parent := fmt.Sprintf("projects/%s/locations/global", projectID)
	resource := &networkmanagementpb.ConnectivityTest{
		Description: "Reachability test between two internal IP addresses",
		Source: &networkmanagementpb.Endpoint{
			IpAddress: "10.0.0.1",
			Network:   fmt.Sprintf("projects/%s/global/networks/default", projectID),
		},
		Destination: &networkmanagementpb.Endpoint{
			IpAddress: "10.0.0.2",
			Network:   fmt.Sprintf("projects/%s/global/networks/default", projectID),
		},
		Protocol: "TCP",
	}

	client, err := networkmanagement.NewReachabilityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewReachabilityClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.CreateConnectivityTestRequest{
		Parent:   parent,
		TestId:   testID,
		Resource: resource,
	}

	op, err := client.CreateConnectivityTest(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateConnectivityTest failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created connectivity test: %s\n", resp.GetName())

	return nil
}

// [END networkmanagement_v1_reachabilityservice_connectivitytest_create]
