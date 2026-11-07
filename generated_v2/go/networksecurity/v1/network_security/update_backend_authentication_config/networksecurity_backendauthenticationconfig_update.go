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

// [START networksecurity_v1_networksecurity_backendauthenticationconfig_update]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBackendAuthenticationConfig updates the description of an existing BackendAuthenticationConfig.
func updateBackendAuthenticationConfig(ctx context.Context, w io.Writer, projectID string, locationID string, backendAuthenticationConfigID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/backendAuthenticationConfigs/%s", projectID, locationID, backendAuthenticationConfigID)

	backendAuthenticationConfig := &networksecuritypb.BackendAuthenticationConfig{
		Name:        name,
		Description: "Updated backend authentication config description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networksecurity.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("networksecurity.NewClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.UpdateBackendAuthenticationConfigRequest{
		UpdateMask:                  updateMask,
		BackendAuthenticationConfig: backendAuthenticationConfig,
	}

	op, err := client.UpdateBackendAuthenticationConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateBackendAuthenticationConfig: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated BackendAuthenticationConfig: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_networksecurity_backendauthenticationconfig_update]
