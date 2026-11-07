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

// [START datastream_v1_datastream_fetch_static_ips]

import (
	"context"
	"errors"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1alpha1"
	datastreampb "cloud.google.com/go/datastream/apiv1alpha1/datastreampb"
	"google.golang.org/api/iterator"
)

// fetchStaticIps retrieves static IP addresses for Datastream in the specified location.
func fetchStaticIps(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datastreampb.FetchStaticIpsRequest{
		Name: name,
	}

	it := client.FetchStaticIps(ctx, req)
	for {
		ip, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("FetchStaticIps failed: %w", err)
		}
		fmt.Fprintf(w, "Static IP: %s\n", ip)
	}

	return nil
}

// [END datastream_v1_datastream_fetch_static_ips]
