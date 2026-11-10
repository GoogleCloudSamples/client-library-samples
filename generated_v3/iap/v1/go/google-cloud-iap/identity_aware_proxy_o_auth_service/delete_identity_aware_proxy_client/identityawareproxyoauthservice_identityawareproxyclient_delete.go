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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// deleteIdentityAwareProxyClient deletes an Identity Aware Proxy OAuth client.
func deleteIdentityAwareProxyClient(ctx context.Context, w io.Writer, brandID string, projectID string, clientID string) error {
	name := fmt.Sprintf("projects/%s/brands/%s/identityAwareProxyClients/%s", projectID, brandID, clientID)

	client, err := iap.NewIdentityAwareProxyOAuthClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyOAuthClient failed: %w", err)
	}
	defer client.Close()

	req := &iappb.DeleteIdentityAwareProxyClientRequest{
		Name: name,
	}

	if err := client.DeleteIdentityAwareProxyClient(ctx, req); err != nil {
		return fmt.Errorf("DeleteIdentityAwareProxyClient: %w", err)
	}

	fmt.Fprintf(w, "Deleted Identity Aware Proxy client: %s\n", name)
	return nil
}

// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclient_delete]
