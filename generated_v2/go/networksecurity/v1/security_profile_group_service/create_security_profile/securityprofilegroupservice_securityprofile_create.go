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

// [START networksecurity_v1_securityprofilegroupservice_securityprofile_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	"cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// createSecurityProfile creates a threat prevention security profile.
func createSecurityProfile(ctx context.Context, w io.Writer, projectID string, locationID string, securityProfileID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	securityProfile := &networksecuritypb.SecurityProfile{
		Type:        networksecuritypb.SecurityProfile_THREAT_PREVENTION,
		Description: "Example Threat Prevention profile",
		Profile: &networksecuritypb.SecurityProfile_ThreatPreventionProfile{
			ThreatPreventionProfile: &networksecuritypb.ThreatPreventionProfile{},
		},
	}

	client, err := networksecurity.NewSecurityProfileGroupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSecurityProfileGroupClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.CreateSecurityProfileRequest{
		Parent:            parent,
		SecurityProfileId: securityProfileID,
		SecurityProfile:   securityProfile,
	}

	op, err := client.CreateSecurityProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSecurityProfile failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created SecurityProfile: %s\n", resp.GetName())

	return nil
}

// [END networksecurity_v1_securityprofilegroupservice_securityprofile_create]
