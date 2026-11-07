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

// [START gkehub_v1beta1_gkehubmembershipservice_generate_connect_manifest]

import (
	"context"
	"fmt"
	"io"

	gkehub "cloud.google.com/go/gkehub/apiv1beta1"
	"cloud.google.com/go/gkehub/apiv1beta1/gkehubpb"
)

// Use the GenerateConnectManifest method.
func generateConnectManifest(ctx context.Context, w io.Writer, projectID string, locationID string, membershipID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/memberships/%s", projectID, locationID, membershipID)

	client, err := gkehub.NewGkeHubMembershipClient(ctx)
	if err != nil {
		return fmt.Errorf("NewGkeHubMembershipClient failed: %w", err)
	}
	defer client.Close()

	req := &gkehubpb.GenerateConnectManifestRequest{
		Name: name,
	}

	resp, err := client.GenerateConnectManifest(ctx, req)
	if err != nil {
		return fmt.Errorf("GenerateConnectManifest: %w", err)
	}

	for _, resource := range resp.GetManifest() {
		fmt.Fprintf(w, "Generated manifest for %s:\n%s\n", resource.GetType().GetKind(), resource.GetManifest())
	}

	return nil
}

// [END gkehub_v1beta1_gkehubmembershipservice_generate_connect_manifest]
