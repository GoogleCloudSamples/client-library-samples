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

// [START run_v2_services_services_list]

import (
	"context"
	"fmt"
	"io"

	run "cloud.google.com/go/run/apiv2"
	runpb "cloud.google.com/go/run/apiv2/runpb"
	"google.golang.org/api/iterator"
)

// Use the ListServices method.
func listServices(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := run.NewServicesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServicesClient failed: %w", err)
	}
	defer client.Close()

	req := &runpb.ListServicesRequest{
		Parent: parent,
	}

	it := client.ListServices(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate services: %w", err)
		}
		fmt.Fprintf(w, "Service: %s\n", resp.GetName())
	}

	return nil
}

// [END run_v2_services_services_list]
