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

// [START iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
	"google.golang.org/api/iterator"
)

// listIdentityAwareProxyClients lists OAuth clients associated with an Identity-Aware Proxy brand.
func listIdentityAwareProxyClients(ctx context.Context, w io.Writer, brandID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/brands/%s", projectID, brandID)

	client, err := iap.NewIdentityAwareProxyOAuthClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyOAuthClient: %w", err)
	}
	defer client.Close()

	req := &iappb.ListIdentityAwareProxyClientsRequest{
		Parent: parent,
	}

	it := client.ListIdentityAwareProxyClients(ctx, req)
	for {
		iapClient, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Client Name: %s, Display Name: %s\n", iapClient.GetName(), iapClient.GetDisplayName())
	}

	return nil
}

// [END iap_v1_identityawareproxyoauthservice_identityawareproxyclients_list]
