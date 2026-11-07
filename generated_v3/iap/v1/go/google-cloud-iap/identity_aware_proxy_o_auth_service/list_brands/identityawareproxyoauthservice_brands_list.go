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

// [START iap_v1_identityawareproxyoauthservice_brands_list]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// listBrands lists the Cloud Identity-Aware Proxy (IAP) OAuth brands for a project.
func listBrands(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := iap.NewIdentityAwareProxyOAuthClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIdentityAwareProxyOAuthClient failed: %w", err)
	}
	defer client.Close()

	req := &iappb.ListBrandsRequest{
		Parent: parent,
	}

	resp, err := client.ListBrands(ctx, req)
	if err != nil {
		return fmt.Errorf("ListBrands: %w", err)
	}

	for _, brand := range resp.GetBrands() {
		fmt.Fprintf(w, "Brand name: %s, Support email: %s, Application title: %s\n",
			brand.GetName(), brand.GetSupportEmail(), brand.GetApplicationTitle())
	}

	return nil
}

// [END iap_v1_identityawareproxyoauthservice_brands_list]
