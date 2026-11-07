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

// [START networksecurity_v1beta1_networksecurity_clienttlspolicy_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
)

// createClientTlsPolicy creates a ClientTlsPolicy resource and waits for the operation to complete.
func createClientTlsPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, clientTlsPolicyID string) error {
	clientTlsPolicy := &networksecuritypb.ClientTlsPolicy{
		Description: "Sample Client TLS policy",
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateClientTlsPolicyRequest{
		Parent:            parent,
		ClientTlsPolicyId: clientTlsPolicyID,
		ClientTlsPolicy:   clientTlsPolicy,
	}

	op, err := client.CreateClientTlsPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateClientTlsPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created ClientTlsPolicy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1beta1_networksecurity_clienttlspolicy_create]
