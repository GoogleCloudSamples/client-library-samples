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

// [START networkmanagement_v1_reachabilityservice_rerun_connectivity_test]

import (
	"context"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	networkmanagementpb "cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
)

// rerunConnectivityTest reruns an existing connectivity test and waits for the operation to complete.
func rerunConnectivityTest(ctx context.Context, w io.Writer, projectID string, testID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/connectivityTests/%s", projectID, testID)

	client, err := networkmanagement.NewReachabilityClient(ctx)
	if err != nil {
	return fmt.Errorf("NewReachabilityClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.RerunConnectivityTestRequest{
		Name: name,
	}

	op, err := client.RerunConnectivityTest(ctx, req)
	if err != nil {
		return fmt.Errorf("RerunConnectivityTest failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Connectivity test rerun completed: %s\n", resp.GetName())

	return nil
}

// [END networkmanagement_v1_reachabilityservice_rerun_connectivity_test]
