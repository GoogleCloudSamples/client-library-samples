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

// [START networkservices_v1beta1_networkservices_endpointpolicy_delete]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1beta1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1beta1/networkservicespb"
)

// deleteEndpointPolicy deletes an EndpointPolicy resource.
func deleteEndpointPolicy(ctx context.Context, w io.Writer, projectID string, endpointPolicyID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/endpointPolicies/%s", projectID, locationID, endpointPolicyID)

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.DeleteEndpointPolicyRequest{
		Name: name,
	}

	op, err := client.DeleteEndpointPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteEndpointPolicy failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Endpoint policy deleted: %s\n", name)
	return nil
}

// [END networkservices_v1beta1_networkservices_endpointpolicy_delete]
