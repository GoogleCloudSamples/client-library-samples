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

// [START networksecurity_v1_networksecurity_backendauthenticationconfig_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createBackendAuthenticationConfig creates a BackendAuthenticationConfig resource using public root certificates.
func createBackendAuthenticationConfig(ctx context.Context, w io.Writer, projectID string, locationID string, backendAuthenticationConfigID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	backendAuthenticationConfig := &networksecuritypb.BackendAuthenticationConfig{
		Description:    "Backend authentication config using public roots",
		WellKnownRoots: networksecuritypb.BackendAuthenticationConfig_PUBLIC_ROOTS,
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateBackendAuthenticationConfigRequest{
		Parent:                        parent,
		BackendAuthenticationConfigId: backendAuthenticationConfigID,
		BackendAuthenticationConfig:   backendAuthenticationConfig,
	}

	op, err := client.CreateBackendAuthenticationConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateBackendAuthenticationConfig failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created BackendAuthenticationConfig: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_backendauthenticationconfig_create]
