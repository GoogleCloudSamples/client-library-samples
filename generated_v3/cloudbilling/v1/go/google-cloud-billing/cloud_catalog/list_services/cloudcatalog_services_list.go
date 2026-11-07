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

// [START billingbudgets_v1_cloudcatalog_services_list]

import (
	"context"
	"fmt"
	"io"

	billingbudgets "cloud.google.com/go/billing/apiv1"
	billingpb "cloud.google.com/go/billing/apiv1/billingpb"
	"google.golang.org/api/iterator"
)

// Use the ListServices method.
func listServices(ctx context.Context, w io.Writer) error {
	client, err := billingbudgets.NewCloudCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &billingpb.ListServicesRequest{}
	it := client.ListServices(ctx, req)

	// Iterate through catalog services and output key service details.
	for {
		service, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListServices iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Service: %s (%s)\n", service.GetDisplayName(), service.GetName())
	}

	return nil
}

// [END billingbudgets_v1_cloudcatalog_services_list]
