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

// [START networksecurity_v1_networksecurity_clienttlspolicy_update]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	"cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateClientTlsPolicy updates an existing ClientTlsPolicy resource description.
func updateClientTlsPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, clientTlsPolicyID string) error {
	clientTlsPolicy := &networksecuritypb.ClientTlsPolicy{
		Name:        fmt.Sprintf("projects/%s/locations/%s/clientTlsPolicies/%s", projectID, locationID, clientTlsPolicyID),
		Description: "Updated description for Client TLS Policy",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.UpdateClientTlsPolicyRequest{
		UpdateMask:      updateMask,
		ClientTlsPolicy: clientTlsPolicy,
	}

	op, err := client.UpdateClientTlsPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateClientTlsPolicy failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated Client TLS Policy: %s\n", resp.GetName())

	return nil
}

// [END networksecurity_v1_networksecurity_clienttlspolicy_update]
