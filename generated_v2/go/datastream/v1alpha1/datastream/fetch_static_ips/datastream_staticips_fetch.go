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

// [START datastream_v1alpha1_datastream_fetch_static_ips]

import (
	"context"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1alpha1"
	datastreampb "cloud.google.com/go/datastream/apiv1alpha1/datastreampb"
	"google.golang.org/api/iterator"
)

// fetchStaticIps fetches the list of static IP addresses for the specified region.
func fetchStaticIps(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	// Construct the resource name from project and location identifiers.
	name := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %v", err)
	}
	defer client.Close()

	req := &datastreampb.FetchStaticIpsRequest{
		Name: name,
	}

	it := client.FetchStaticIps(ctx, req)
	for {
		ip, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("FetchStaticIps: %w", err)
		}
		fmt.Fprintf(w, "Static IP: %s\n", ip)
	}

	return nil
}

// [END datastream_v1alpha1_datastream_fetch_static_ips]
