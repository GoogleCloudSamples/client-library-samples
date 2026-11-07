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

// [START networksecurity_v1_securityprofilegroupservice_securityprofile_get]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// getSecurityProfile retrieves a security profile by its resource name.
func getSecurityProfile(ctx context.Context, w io.Writer, projectID string, locationID string, securityProfileID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/securityProfiles/%s", projectID, locationID, securityProfileID)

	client, err := networksecurity.NewSecurityProfileGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSecurityProfileGroupClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.GetSecurityProfileRequest{
		Name: name,
	}

	resp, err := client.GetSecurityProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSecurityProfile failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved security profile: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_securityprofilegroupservice_securityprofile_get]
