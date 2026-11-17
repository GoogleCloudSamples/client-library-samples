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

// [START osconfig_v1beta_osconfigservice_lookup_effective_guest_policy]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1beta"
	osconfigpb "cloud.google.com/go/osconfig/apiv1beta/osconfigpb"
)

// lookupEffectiveGuestPolicy retrieves the effective guest policy applied to a VM instance.
func lookupEffectiveGuestPolicy(ctx context.Context, w io.Writer, projectID string, zoneID string, instanceID string) error {
	instance := fmt.Sprintf("projects/%s/zones/%s/instances/%s", projectID, zoneID, instanceID)

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.LookupEffectiveGuestPolicyRequest{
		Instance: instance,
	}

	resp, err := client.LookupEffectiveGuestPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("LookupEffectiveGuestPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Effective guest policy retrieved for: %s\n", instance)
	fmt.Fprintf(w, "Packages: %d\n", len(resp.GetPackages()))
	fmt.Fprintf(w, "Package repositories: %d\n", len(resp.GetPackageRepositories()))
	fmt.Fprintf(w, "Software recipes: %d\n", len(resp.GetSoftwareRecipes()))

	return nil
}

// [END osconfig_v1beta_osconfigservice_lookup_effective_guest_policy]
