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

// [START networkservices_v1_networkservices_servicelbpolicy_get]

import (
	"context"
	"fmt"
	"io"

	networkservices "cloud.google.com/go/networkservices/apiv1"
	networkservicespb "cloud.google.com/go/networkservices/apiv1/networkservicespb"
)

// getServiceLbPolicy retrieves a ServiceLbPolicy by its resource name.
func getServiceLbPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, serviceLbPolicyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/serviceLbPolicies/%s", projectID, locationID, serviceLbPolicyID)

	client, err := networkservices.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &networkservicespb.GetServiceLbPolicyRequest{
		Name: name,
	}

	response, err := client.GetServiceLbPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetServiceLbPolicy: %w", err)
	}

	fmt.Fprintf(w, "Retrieved ServiceLbPolicy: %s\n", response.GetName())
	return nil
}

// [END networkservices_v1_networkservices_servicelbpolicy_get]
