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

// [START networksecurity_v1_networksecurity_servertlspolicy_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createServerTlsPolicy creates a ServerTlsPolicy resource in Google Cloud Network Security.
func createServerTlsPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, serverTlsPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	serverTlsPolicy := &networksecuritypb.ServerTlsPolicy{
		Description: "Example Server TLS Policy",
		AllowOpen:   true,
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateServerTlsPolicyRequest{
		Parent:            parent,
		ServerTlsPolicyId: serverTlsPolicyID,
		ServerTlsPolicy:   serverTlsPolicy,
	}

	op, err := client.CreateServerTlsPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateServerTlsPolicy: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created ServerTlsPolicy: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_servertlspolicy_create]
