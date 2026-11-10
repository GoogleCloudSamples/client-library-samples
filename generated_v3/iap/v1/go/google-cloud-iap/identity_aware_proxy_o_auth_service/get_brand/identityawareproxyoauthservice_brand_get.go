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

// [START iap_v1_identityawareproxyoauthservice_brand_get]

import (
	"context"
	"fmt"
	"io"

	iap "cloud.google.com/go/iap/apiv1"
	iappb "cloud.google.com/go/iap/apiv1/iappb"
)

// getBrand retrieves the OAuth brand for a project.
func getBrand(ctx context.Context, w io.Writer, brandID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/brands/%s", projectID, brandID)

	client, err := iap.NewIdentityAwareProxyOAuthClient(ctx)
	if err != nil {
		return fmt.Errorf("iap.NewIdentityAwareProxyOAuthClient: %w", err)
	}
	defer client.Close()

	req := &iappb.GetBrandRequest{
		Name: name,
	}

	brand, err := client.GetBrand(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetBrand: %w", err)
	}

	fmt.Fprintf(w, "Brand name: %s\n", brand.GetName())
	fmt.Fprintf(w, "Support email: %s\n", brand.GetSupportEmail())
	fmt.Fprintf(w, "Application title: %s\n", brand.GetApplicationTitle())

	return nil
}

// [END iap_v1_identityawareproxyoauthservice_brand_get]
