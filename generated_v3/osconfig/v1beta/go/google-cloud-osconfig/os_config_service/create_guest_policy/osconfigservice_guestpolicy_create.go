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

// [START osconfig_v1beta_osconfigservice_guestpolicy_create]

import (
	"context"
	"fmt"
	"io"
	"os"

	osconfig "cloud.google.com/go/osconfig/apiv1beta"
	osconfigpb "cloud.google.com/go/osconfig/apiv1beta/osconfigpb"
)

// createGuestPolicy creates an OS Config guest policy.
func createGuestPolicy(ctx context.Context, w io.Writer, guestPolicyID string) error {
	projectNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectNumber == "" {
		projectNumber = os.Getenv("PROJECT_ID")
	}
	if projectNumber == "" {
		projectNumber = "example-project-number"
	}
	parent := fmt.Sprintf("projects/%s", projectNumber)
	guestPolicy := &osconfigpb.GuestPolicy{
		Description: "Example guest policy for package management",
		Packages: []*osconfigpb.Package{
			{
				// Use the guest policy ID as the package name to avoid conflict
				// with existing guest policies managing packages on the same instances.
				Name:         guestPolicyID,
				DesiredState: osconfigpb.DesiredState_INSTALLED,
			},
		},
	}

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.CreateGuestPolicyRequest{
		Parent:        parent,
		GuestPolicyId: guestPolicyID,
		GuestPolicy:   guestPolicy,
	}

	resp, err := client.CreateGuestPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateGuestPolicy: %w", err)
	}

	fmt.Fprintf(w, "Created guest policy: %s\n", resp.GetName())
	return nil
}

// [END osconfig_v1beta_osconfigservice_guestpolicy_create]
