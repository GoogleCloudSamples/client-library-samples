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

// [START networkmanagement_v1_reachabilityservice_connectivitytest_update]

import (
	"context"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	networkmanagementpb "cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateConnectivityTest updates the description of an existing connectivity test.
func updateConnectivityTest(ctx context.Context, w io.Writer, projectID string, connectivityTestID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	resource := &networkmanagementpb.ConnectivityTest{
		Name:        fmt.Sprintf("projects/%s/locations/global/connectivityTests/%s", projectID, connectivityTestID),
		Description: "Updated description for the connectivity test",
	}

	client, err := networkmanagement.NewReachabilityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewReachabilityClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.UpdateConnectivityTestRequest{
		UpdateMask: updateMask,
		Resource:   resource,
	}

	op, err := client.UpdateConnectivityTest(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateConnectivityTest failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated connectivity test: %s\n", resp.GetName())
	return nil
}

// [END networkmanagement_v1_reachabilityservice_connectivitytest_update]
