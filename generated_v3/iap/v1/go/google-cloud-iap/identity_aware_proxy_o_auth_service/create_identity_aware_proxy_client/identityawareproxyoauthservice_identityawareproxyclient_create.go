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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_create]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// createIdentityAwareProxyClient creates an OAuth client identity for Identity-Aware Proxy.
func createIdentityAwareProxyClient(ctx context.Context, w io.Writer, brandID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/brands/%s", projectID, brandID)
	identityAwareProxyClient := &iappb.IdentityAwareProxyClient{
		DisplayName: "Sample IAP Client",
	}

	client, err := iap.NewIdentityAwareProxyOAuthClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyOAuthClient failed: %w", err)
	}
	defer client.Close()

	req := &iappb.CreateIdentityAwareProxyClientRequest{
		Parent:                   parent,
		IdentityAwareProxyClient: identityAwareProxyClient,
	}

	response, err := client.CreateIdentityAwareProxyClient(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateIdentityAwareProxyClient: %w", err)
	}

	fmt.Fprintf(w, "Created client: %s\n", response.GetName())
	return nil
}

// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_create]
